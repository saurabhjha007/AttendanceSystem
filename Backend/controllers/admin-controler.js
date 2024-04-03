const User= require("../models/auth-models");

module.exports.getAllusers= async (req,res)=>{
    try {
        const allusersData = await User.find({}).select({password:0});
        res.status(200).json({
            success: true,
            allusersData
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            msg:'server error!'
        })
    }

}

module.exports.getOneusers = async(req,res)=>{
    try {
        const {id} = req.params;
        const oneusersData = await User.findById(id).select({password:0});

        res.status(200).json(oneusersData);
        
    } catch (error) {
        res.status(400).json({msg:'Something went wrong!!'})  
    }
}

module.exports.deleteUsers= async(req,res)=>{
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.status(202).json({msg:'successfully delete User'});
        
    } catch (error) {
        res.status(400).json({msg:'Something went wrong!!'})
    }
}

module.exports.upadateUsers=async(req,res)=>{
    try {
        const {id} = req.params;
        const {name, username, email,phone} = req.body;

        const existingUser = await User.findById(id);

        if(name) existingUser.name = name;
        if(username) existingUser.username = username;
        if(email) existingUser.email = email;
        if(phone) existingUser.phone = phone;

        const regexname=/^[A-Za-z\s]{3,30}$/;
        const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexphone = /^[6789][0-9]{9,14}$/;

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


        await existingUser.save();

        res.status(200).json({
            success:true,
            msg:'Users updated successfully!'
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:'Server Error'
        })
    }
}