const prisma = require("../../lib/prisma");

async function getAllBlogs(req, res) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  const tag = req.query.tag;

  const validTags = ["systems", "cuda", "algorithms"];

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;
  if (limit > 50) limit = 50;

  const offset = (page - 1) * limit;

  try {

    if (tag && !validTags.includes(tag)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tag",
      });
    }

    const where = {
      isPublished: true,
      ...(tag && { tag })
    };

    const total = await prisma.blog.count({ where });

    const blogs = await prisma.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        createdAt: true,
        tag: true,
        description: true
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