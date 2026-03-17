const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit")

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

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many login attempts, try again after 15 minutes" }
})

router.post(
    "/admin/login",
    loginLimiter,
    login
)

router.post("/admin/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    })
    res.json({ success: true, message: "Logged out" })
})

router.get("/admin/auth-check", requireUser, (req, res) => {
    res.json({ success: true })
})

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