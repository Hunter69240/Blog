const prisma = require("../../lib/prisma");

async function getAllBlogs(req, res) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;
  if (limit > 50) limit = 50;

  const offset = (page - 1) * limit;

  try {
    const total = await prisma.blog.count();

    const blogs = await prisma.blog.findMany({
      
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        createdAt: true,
        tag: true,
        description: true,
        isPublished:true,
        content:true
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset
    });

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: blogs
    });

  } catch (error) {
    console.log("getAllBlogs error", error);
    res.status(500).json({
      success: false,
      message: "Error viewing blogs",
    });
  }
}

module.exports = getAllBlogs;