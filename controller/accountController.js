const User = require('../model/memberschema.js');
const path = require('path');
const loginaction = require('../model/login_model');
const rootPath = path.resolve(__dirname, '..');
const registaction = require('../model/regist_model');
const updateaction = require('../model/update_model');
const deleteaction = require('../model/delete_model');
const getaction = require('../model/get_model');

module.exports.index = (req, res) => {res.sendFile(rootPath+'/views/index.html');};
module.exports.chatroom = (req, res) => {

	console.log(req.session.user);
	res.render('chatroom', {user: req.session.user});
//res.sendFile(rootPath+'/view/chatroom.html');
};

module.exports.backstage = (req, res) =>{
	getaction().then((result)=>{
		res.render('member', {member: result.member});
	});
};
module.exports.update = (req, res) => {
	req.body = JSON.parse(req.body);
	const data = {
		user: req.body.user,
		pswd: req.body.pswd,
		permision: (typeof req.body.permision !== 'undefined') ?  req.body.permision : 'normal'
	};
	updateaction(data).then((result) =>{
		res.send(JSON.stringify(result))
	},(err) =>{
		res.json({
			result: err
		});
	});
};
	//res.sendFile(rootPath+'/view/member.html')};
module.exports.regist = (req, res) => {
	const data ={
		user: req.body.user,
		pswd: req.body.pswd
	};
	registaction(data).then((result) => {
		/*res.json({
			result: result
		})*/
		req.session.user = data.user;
		res.redirect('/chatroom');
	},(err) => {
		/*res.json({
			err: err
		});*/
		res.redirect('/');
	});
};

module.exports.login = (req, res) => {
	const data={
		user: req.body.user,
		pswd: req.body.pswd
	};
	console.log('login');
	loginaction(data).then((account) =>{
		if(account.pswd === data.pswd){
			/*res.json({
				result:{
					status: "Login sucess",
					User: account.user,
					permision:account.permision
				}
			});*/
			req.session.user = account.user;
			console.log(account.permision);
			if(account.permision === "author"){
				console.log('tobackstatge');
				res.redirect('/member');
				
			}
			else{
				console.log("tochatroom");
				res.redirect('/chatroom');
				
			}
		}
		else{
			/*res.json({
				result:{
					status: "Login Faile",
					err: "Wrong password"
				}
			});*/
			res.redirect('/');
		}
	},(err) => {
			/*res.json({
				err: err
			})*/
			res.redirect('/');

		});
};

module.exports.erase = (req, res) => {
	req.body = JSON.parse(req.body);
	const data ={
		user: req.body.user
	}
	deleteaction(data).then((result) =>{
		res.json({
			result:result
		});
		console.log(result);
	},(err) =>{
		res.json({
			result: err
		});
	});
};

module.exports.logout = (req, res)=> {
	if(req.session.user){
		req.session.destroy(function(){
			res.redirect('/');
		});
	}
	else{
		res.redirect('/');
	}
};

module.exports.add = (req, res)=> {
	const data ={
		user: req.body.user,
		pswd: req.body.pswd,
		permision: req.body.permision
	};
	console.log(req.body);
	registaction(data).then((result) => {
		getaction().then((result)=>{
		res.render('member', {member: result.member});
	});			
	},(err) => {
		getaction().then((result)=>{
		res.render('member', {member: result.member});
		});
	});
}
