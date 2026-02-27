const express = require("express");
const router = express.Router();

const requireUser=require("../middlewares/reqUser")
const login=require("../controllers/authController")
const getBlogs=require("../controllers/users/getAllBlogs")
const getBlogBySlug=require("../controllers/users/getBlogBySlug")
const createBlog=require("../controllers/admin/createBlog")
const updateBlog=require("../controllers/admin/updateBlog")

router.post(
    "/login",
    login
)

/* User side start*/
router.get(
    "/blogs",
    getBlogs
)

router.get(
    "/blogs/:slug",
    getBlogBySlug
)
/* User side done*/

/* Admin side start */
router.post(
    "/blogs",
    requireUser,
    createBlog
)

router.patch(
    "/blogs/:id",
    requireUser,
    updateBlog
)
/* Admin side done*/
module.exports=router