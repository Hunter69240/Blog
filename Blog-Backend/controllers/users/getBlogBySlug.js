/*
 * Method: GET
 * URL: /blogs/:slug
 * Example URL: /blogs/my-first-blog
 */

const prisma = require("../../lib/prisma");

async function getBlogBySlug(req, res) {
  const { slug } = req.params;

  try {

    const result = await prisma.blog.findFirst({
      where: {
        slug,
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        tag: true,
        content: true,
        coverImage: true,
        createdAt: true
      }
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog doesn't exist"
      });
    }

    return res.status(200).json({
      success: true,
      blog: result
    });

  } catch (err) {
    console.error("getBlogBySlug error", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching blog"
    });
  }
}

module.exports = getBlogBySlug;