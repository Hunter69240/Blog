/*
 * Method: PATCH
 * URL: /blogs/:id/publish
 */

const prisma = require("../../lib/prisma");

async function publishBlog(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid blog id"
    });
  }
  try {
    
    const blog = await prisma.blog.update({
      where: {
        id,
        isPublished: false
      },
      data: {
        isPublished: true
      }
    });

    return res.status(200).json({
      success: true,
      message: "Published blog",
      blog:blog
      
    });

  } catch (err) {

    console.log("publishBlog error", err);

    return res.status(500).json({
      success: false,
      message: "Error publishing blog"
    });
  }
}

module.exports = publishBlog;