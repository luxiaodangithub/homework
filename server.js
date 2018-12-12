const express=require("express");
const http=express();
const mongodb=require("./db.js");
const db=new mongodb("xinyuan");
const bodyparser=require("body-Parser");
const postparse=bodyparser.urlencoded({extended:false});
http.use((req,res,next)=>{
	res.header("Access-control-Allow-Origin","*");
	next();
})
http.listen(8080,()=>{
	console.log("runing")
})
http.post("/add",postparse,(req,res)=>{
	let obj=req.body;
	db.insertOne("ly",obj,(err,data)=>{
		res.send(data);
	})
	
})
http.get("/msg",(req,res)=>{
	let  obj=req.query;
	db.find("ly",{},(err,data)=>{
		res.send(data)
	})
})
http.get("/delete",(req,res)=>{
	let obj=req.query;
	db.deleteById("ly",obj.id,(err,data)=>{
		res.send(data)
	})
})
http.get("/upd",(req,res)=>{
	let obj=req.query;
	console.log(obj.id)
	db.findById("ly",obj.id,(err,data)=>{
		if(err){
			res.send("渲染失败")
		}else{
			data.color=data.color?0:1;
			db.updateById("ly",obj.id,data,function(err){
				if(err){
					res.send("变色失败")
				}else{
					res.send("变色成功")
				}
			})
		}
	})
})
