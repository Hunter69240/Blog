/*
 * Method: PATCH
 * URL: /blogs/:id/unpublish
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

    const existingBlog = await prisma.blog.findUnique({ where: { id } });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (!existingBlog.isPublished) {
      return res.status(409).json({
        success: false,
        message: "Blog already unpublished"
      });
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: { isPublished: false }
    });

    return res.status(200).json({
      success: true,
      message: "Unpublished blog",
      blog: blog
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error unpublishing blog"
    });
  }
}

module.exports = unpublishBlog;