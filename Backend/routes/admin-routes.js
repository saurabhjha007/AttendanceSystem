const express = require("express");
const router=express.Router();
const {getAllusers,getOneusers,deleteUsers,upadateUsers}=require("../controllers/admin-controler");


router.route("/users").get(getAllusers);
router.route("/users/:id").get(getOneusers);
router.route("/users/:id").delete(deleteUsers);
router.route("/users/:id/edit").put(upadateUsers);

module.exports = router;