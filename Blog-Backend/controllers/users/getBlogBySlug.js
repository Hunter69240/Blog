/*
 * Method: GET
 * URL: /blogs/:slug
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

    const words = result.content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return res.status(200).json({
      success: true,
      blog: result,
      readingTime
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