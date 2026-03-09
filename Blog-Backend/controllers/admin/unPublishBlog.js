/*
 * Method: PATCH
 * URL: /blogs/:id/publish
 */

const prisma = require("../../lib/prisma");

async function unpublishBlog(req, res) {
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
        isPublished: true
      },
      data: {
        isPublished: false
      }
    });

    

    return res.status(200).json({
      success: true,
      message: "Unpublished blog",
      blog:blog
    });

  } catch (err) {

    console.log("UnpublishBlog error", err);

    return res.status(500).json({
      success: false,
      message: "Error Unpublishing blog"
    });
  }
}

module.exports = unpublishBlog;