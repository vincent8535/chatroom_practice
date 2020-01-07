const User = require('../model/memberschema.js');
const loginaction = require('../model/login_model');
const registaction = require('../model/regist_model');
const updateaction = require('../model/update_model');
const deleteaction = require('../model/delete_model');
const getaction = require('../model/get_model');

module.exports.testlogin = (req, res) =>{
	var rightdata ={
		user: "admin",
		pswd: "admin"
	};
	var wrongpswd ={
		user: "admin",
		pswd: "aaaa"
	};
	var wronguser ={
		user: "aaaa",
		pswd: "admin"
	};
	var nouser ={
		user: "",
		pswd: "aaaa"
	};
	var nopswd ={
		user: "admin",
		pswd: ""
	};
	var allwrong ={
		user: "aaaa",
		pswd: "aaaa"
	};
	let result={}
	loginaction(rightdata).then((account) => {
		result.rightdata = account;
		console.log(account);
		console.log(result);
	},(err) =>{
		result.rightdata = err;
	});
	loginaction(wrongpswd).then((account) => {
		result.wrongpswd = account;
	},(err) =>{
		result.wrongpswd = err;
	});
	loginaction(wronguser).then((account) =>{
		result.wronguser = account;
	},(err) =>{
		result.wronguser = err;
	});
	loginaction(nouser).then((account) =>{
		result.nouser = account;
	},(err) =>{
		result.nouser =err;
	});
	loginaction(nopswd).then((account) =>{
		result.nopswd = account;
	},(err) =>{
		result.nopswd = err;
	});
	loginaction(allwrong).then((account) =>{
		result.allwrong = account;
		res.json(result);
	},(err) =>{
		result.allwrong = err;
		res.json(result);
	});
}

module.exports.testregist = (req,res) =>{
	var existUser = {
		user: "admin",
		pswd: "admin"
	};
	let result = {};
	registaction(existUser).then((data)=>{
		result.existUser = data;
		res.send(result);
	},(err) =>{
		result.existUser = err;
		res.send(result);
	});
}

module.exports.testupdate = (req,res) => {
	var author_normal = {
		user: "testupdate",
		pswd: "admin",
		permision: "normal"
		
	}
	var normal_author ={
		user: "testupdate2",
		pswd: "admin",
		permision: "author"
	}
	let result = {};
	
	updateaction(author_normal).then((data)=>{
		result.author_normal = data;
	},(err)=>{
		result.author_normal = err;
	});
	updateaction(normal_author).then((data) =>{
		result.normal_author = data;
		res.send(result);
	},(err) =>{
		result.normal_author = err;
		res.send(result);
	});

}

module.exports.testdelete =(req,res)=>{
	var noexist ={
		user: "testdelete"
	};
	let result = {};
	deleteaction(noexist).then((data) =>{
		result.noexist = data;
		res.send(result);
	},(err)=>{
		result.noexist = err;
		res.send(result);
	});
}