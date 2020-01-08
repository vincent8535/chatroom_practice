const express = require('express')
const app = express();
const server = require('http').Server(app);
const router = require('./router');
const io = require('socket.io')(server);
const storage = require('./storage.js')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 3000; //設定port
const testrouter = require('./test_router');

let onlineCount = 0;

//中間件
//app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());


 
app.use(cookieParser('sessiontest')); //session 設定
app.use(session({
 secret: 'sessiontest', //与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));

app.use(router); //使用router
//app.use(testrouter); //unit test

io.on('connection', (socket) => { //client連線
	console.log('Hello');
	onlineCount++;
	
	io.emit("online", onlineCount);
	socket.emit("maxStorage", storage.getMax());
	
	storage.get((msgs) => { 
		socket.emit("chatStorage", msgs);
	});
	
	socket.on("send", (msg) => {
		console.log(msg);
		if(Object.keys(msg).length < 3 ){
			console.log('blank');
			console.log(msg);
			return;
		}
		storage.push(msg);

	});
	
	socket.on('disconnect', () => { //使用者斷線
		onlineCount= (onlineCount < 0) ? 0 : onlineCount-=1;
		io.emit("online", onlineCount);
		console.log('Bye~');
	});
	
});

storage.on("new_message", (msg) => {
	io.emit("msg", msg);
});

//啟動server
server.listen(PORT, () => {
	console.log("app run on port ${PORT}");
});