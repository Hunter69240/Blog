/*
 * Method: PATCH
 * URL: /blogs/:id/publish
 */

const prisma = require("../../lib/prisma");

async function publishBlog(req, res) {
  const id = parseInt(req.params.id);

  try {

    const result = await prisma.blog.updateMany({
      where: {
        id,
        isPublished: false
      },
      data: {
        isPublished: true
      }
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or already published"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Published blog"
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