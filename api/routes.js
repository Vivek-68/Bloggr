const router = require('express').Router();
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register',async(req,res)=>{
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
try{
    const {email,password} = req.body;
    const user = await User.findOne({username:email});
    if(!user){
        return res.status(400).json({message:"Email does not exist!"});
    }
    const passwordOK = await bcrypt.compare(password,user.password);
    if(!passwordOK){
        return res.status(400).json({message:"Incorrect password!"});
    }

    const token = jwt.sign({id:user._id,username:email},process.env.SECRET_KEY);
    res.cookie('token',token).json({id:user._id,username:user.email});

}
catch(e){
    res.status(400).json(e);
}
})

router.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json("Invalid token");
    }
    jwt.verify(token,process.env.SECRET_KEY,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});

router.post('/logout',(req,res)=>{
    res.cookie('token','').json('Logged out');
})

module.exports = router;