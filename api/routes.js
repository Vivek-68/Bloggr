const router = require('express').Router();
const User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const mongoose = require('mongoose');
const fs = require('fs')
const {validateRegistration,validateLogin} = require('./services/validation');

router.post('/register',async(req,res)=>{
    const {error} = validateRegistration(req.body);
    if(error){
       return res.status(400).json(error.details[0].message);
    }
    try{
        const {email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({username:email,password:hashedPassword});
        res.json(user);

    }
    catch(e){
        res.status(400).json(e);
    }
})


router.post('/login',async(req,res)=>{
const {error} = validateLogin(req.body);
if(error){
    return res.status(400).json(error.details[0].message);
}
try{
    const {email,password} = req.body;
    const user = await User.findOne({username:email});
    if(!user){
        return res.status(400).json("Email does not exist!");
    }
    const passwordOK = await bcrypt.compare(password,user.password);
    if(!passwordOK){
        return res.status(400).json("Incorrect password!");
    }

    const token = jwt.sign({id:user._id,username:email},process.env.SECRET_KEY);
    res.cookie('token',token);
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    res.json(decode);

}
catch(e){
    res.status(400).json(e.message);
}
})

router.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
    jwt.verify(token,process.env.SECRET_KEY,{},(err,info)=>{
        if(err) throw err;
        return res.json(info);
    });
}
});

router.post('/logout',(req,res)=>{
    res.cookie('token','').json('Logged out');
})

router.post('/post',upload.single('files'),async(req,res) =>{
   const {originalname,path} = req.file;
   const org = originalname.split('.');
   const ext = org[org.length - 1];
   const filename = path + '.'+ ext;
   fs.renameSync(path,filename);
   const {title,summary,content} = req.body;
   const {token} = req.cookies;
   if(!token){
    return res.status(302).json({message:"Token not found"});
   }
   const decoded = jwt.verify(token,process.env.SECRET_KEY);
   const postDoc = await Post.create({
    title,
    summary,
    content,
    image:filename,
    author:decoded.id
   });
   res.json(postDoc);
})

router.get('/post',async(req,res)=>{
    const posts = await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(25);
    res.json(posts);
})

router.get('/posts/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const post = await Post.findOne({_id:id}).populate('author',['username']);
    res.json(post);
    }
    catch(e){
        console.log(e.message);
    }
})

router.post('/edit/:id',upload.single('files'),async(req,res) =>{
    try{
        const {id} = req.params;
        const {originalname,path} = req.file;
        const org = originalname.split('.');
        const ext = org[org.length - 1];
        const filename = path + '.'+ ext;
        fs.renameSync(path,filename);
        const {title,summary,content} = req.body;
        const post = await Post.updateOne({_id:id},{$set:{title:title,summary:summary,content:content,image:filename}});
        return res.json(post);
    }
    catch(e){
        console.log(e.message);
    }
})

module.exports = router;