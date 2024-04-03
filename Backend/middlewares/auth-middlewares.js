const jwt = require("jsonwebtoken");
const User= require("../models/auth-models");

const authMiddlewares= async (req,res,next)=>{
    const Token = req.header('Authorization');
    if(!Token){
        return res.status(400).json({msg:"Unathorized HTTP , token is not provided"})
    }
    try {
        const jwtToken = Token.replace("Bearer","").trim();
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY,);
        const userData= await User.findOne({username:isVerified.username}).select({password:0});
        req.user = userData;
        req.Token = Token;
        req.userId=userData._id;
        

    next();
} catch (error) {
     res.json({msg:"Unathorized HTTP , token is not provided"})
}
}

module.exports=authMiddlewares;