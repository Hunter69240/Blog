const express = require("express");
const router = express.Router();

const {reqUser}=require("../middlewares/reqUser")
const login=require("../controllers/authController")

router.post(
    "/login",
    login
)

module.exports=router