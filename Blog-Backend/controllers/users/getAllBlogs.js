/*
 * Method: GET
 * URL: /blogs
 * Example: /blogs?page=1&limit=4
 */

const prisma = require("../../lib/prisma");

async function getAllBlogs(req, res) {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const skip = (page - 1) * limit;

    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        slug: true,
        tag: true,
        description: true,
        coverImage: true,
        createdAt: true,
        content:true
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: skip,
      take: limit
    });

    const totalBlogs = await prisma.blog.count({
      where: {
        isPublished: true
      }
    });

    const totalPages = Math.ceil(totalBlogs / limit);

    const blogsWithReadingTime = blogs.map((blog) => {
      const words = blog.content.split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);

      return {
        ...blog,
        readingTime
      };
    });

    return res.status(200).json({
      success: true,
      blogs: blogsWithReadingTime,
      totalPages: totalPages
    });

  } catch (err) {
    console.error("getAllBlogs error", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching blogs"
    });
  }
}

module.exports = getAllBlogs;