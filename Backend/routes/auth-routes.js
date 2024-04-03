const express = require("express");
const router=express.Router();
const {userdata,register,login,logout} = require("../controllers/auth-controllers");
const authMiddlewares= require("../middlewares/auth-middlewares");


router.route("/user").get(authMiddlewares,userdata);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;