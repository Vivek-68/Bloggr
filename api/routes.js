const router = require('express').Router();
const User = require('./models/user');


router.post('/register',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.create({username:email,password});
        res.json(user);

    }
    catch(e){
        console.log(e.message);
    }
})

module.exports = router;