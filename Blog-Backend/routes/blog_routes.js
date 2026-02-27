const express = require("express");
const router = express.Router();

const {reqUser}=require("../middlewares/reqUser")
const login=require("../controllers/authController")
const getBlogs=require("../controllers/users/getAllBlogs")
const getBlogBySlug=require("../controllers/users/getBlogBySlug")

router.post(
    "/login",
    login
)

router.get(
    "/blogs",
    getBlogs
)

router.get(
    "/blogs/:slug",
    getBlogBySlug
)

module.exports=router