/*
 * Method: POST
 * URL: /blogs
 * Body: Yes (title, content, cover_image, tag, description)
 */

const prisma = require("../../lib/prisma");

async function createBlog(req, res) {

  const { title, content, cover_image, tag, description } = req.body;

  if (!title || !content || !cover_image || !tag || !description) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data"
    });
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  try {

    const result = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        coverImage: cover_image,
        isPublished: false,
        tag,
        description
      }
    });

    return res.status(201).json({
      success: true,
      id: result.id
    });

  } catch (error) {

    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Blog with slug already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading blog"
    });
  }
}

module.exports = createBlog;