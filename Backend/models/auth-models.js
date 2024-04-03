const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

});

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword; 
        
    } catch (error) {
        next(error)
    }
})

userSchema.methods.genrateToken = async function(){
try {
    
    return jwt.sign({
        userId:this._id.toString(),
        name:this.name,
        username:this.username,
        email:this.email,
        isAdmin:this.isAdmin
    },
    process.env.JWT_SECRET_KEY,{
        expiresIn:"30d",
    }
    )
} catch (error) {
    console.error(error);
}
}

const User = mongoose.model("User",userSchema);

module.exports = User;