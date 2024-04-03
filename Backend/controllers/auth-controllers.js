const User=require("../models/auth-models")
const bcrypt=require("bcryptjs");

module.exports.userdata = async(req,res) => {
    try {
        
         const userData = req.user;
         res.status(200).json({userData});
        
    } catch (error) {
        
        console.log(`Error from the login route ${error}`)
         res.status(400).json("internal error")
    }
};

module.exports.register = async(req,res)=>{
    try {
        const {name,username,email,phone,password}=req.body;
        
        const userExit= await User.findOne({username});
        if(userExit){
           return res.status(400).json({msg:"user allready Exits"});
        }
        const regexname=/^[A-Za-z\s]{3,30}$/;
        const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexphone = /^[6789][0-9]{9,14}$/;
        const regexPassword = /^[A-Za-z-@!#%^&* .0-9]{8,16}$/;

        if(!regexname.test(name)){
            return res.status(400).send('Invalid name');
        }

        if(!regexusername.test(username)){
            return res.status(400).send('Invalid username format');
        }

        if(!regexEmail.test(email)){
            return res.status(400).send('Invalid email format');
        }
        if(!regexphone.test(phone)){
            return res.status(400).send('Invalid phone number');
        }
        if(!regexPassword.test(password)){
            return res.status(400).send('Password must contain minimum eight characters');
        }

        const data = await User.create({name,username,email,phone,password});
        res.status(200).json({
            msg:"Registraion successfully",
            token: await data.genrateToken(),
            userId:data._id.toString(),
         });
    
    } catch (error) {
        res.status(500).json("Internal Error");
    }
}

module.exports.login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const userExit = await User.findOne({username});
        if(!userExit){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
        const regexPassword = /^[A-Za-z-@!#%^&* .0-9]{8,16}$/;

        if(!regexusername.test(username)){
            return res.status(400).send('Invalid credentials');
        }
        if(!regexPassword.test(password)){
            return res.status(400).send('Invalid credentials');
        }

        const isValid = await bcrypt.compare(password , userExit.password);

        if (isValid) {
            res.status(201).json({
                msg:"Login Succesfully",
                token: await userExit.genrateToken(),
                userId:userExit._id.toString()
             });
            
        } else {
            res.status(400).json({msg:"Invalid credentials"})
            
        }
        
    } catch (error) {
        res.status(500).json("Internal Error");
    }
}

module.exports.logout=(req,res)=>{
    res.clearCookie('token');
    res.send("Logout Successfully ");
}

