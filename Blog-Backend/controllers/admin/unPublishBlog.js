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

    const result = await prisma.blog.updateMany({
      where: {
        id,
        isPublished: true
      },
      data: {
        isPublished: false
      }
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or already un-published"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unpublished blog"
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