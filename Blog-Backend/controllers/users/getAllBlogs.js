const db = require("../../db");

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

    let totalResult;
    let result;

    if (tag) {
      totalResult = await db.query(
        "SELECT COUNT(*) FROM blogs WHERE is_published = true AND tag = $1",
        [tag]
      );

      result = await db.query(
        `SELECT id, title, slug,
                SUBSTRING(content, 1, 200) AS excerpt,
                cover_image,
                created_at,
                tag
         FROM blogs
         WHERE is_published = true AND tag = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [tag, limit, offset]
      );
    } else {
      totalResult = await db.query(
        "SELECT COUNT(*) FROM blogs WHERE is_published = true"
      );

      result = await db.query(
        `SELECT id, title, slug,
                cover_image,
                created_at,
                tag,
                description
         FROM blogs
         WHERE is_published = true
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    }

    const total = parseInt(totalResult.rows[0].count);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
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