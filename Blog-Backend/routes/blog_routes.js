const express = require("express");
const router = express.Router();

const requireUser=require("../middlewares/reqUser")
const login=require("../controllers/authController")
const getBlogs=require("../controllers/users/getAllBlogs")
const getBlogBySlug=require("../controllers/users/getBlogBySlug")
const createBlog=require("../controllers/admin/createBlog")
const updateBlog=require("../controllers/admin/updateBlog")
const publishBlog=require("../controllers/admin/publishBlog")
const unPublishBlog=require("../controllers/admin/unPublishBlog")
const getAdminBlogs=require("../controllers/admin/getAllBlogs.js")
const getAdminBlogBySlug=require("../controllers/admin/getBlogBySlug.js")
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
router.get(
    "/admin/blogs",
    requireUser,
    getAdminBlogs
)

router.get(
    "/admin/blogs/:slug",
    requireUser,
    getAdminBlogBySlug
)
router.post(
    "/admin/blogs",
    requireUser,
    createBlog
)

router.patch(
    "/admin/blogs/:id",
    requireUser,
    updateBlog
)

router.patch(
    "/admin/blogs/:id/publish",
    requireUser,
    publishBlog
)

router.patch(
    "/admin/blogs/:id/unpublish",
    requireUser,
    unPublishBlog
)
/* Admin side done*/
module.exports=router