/*
 * Method: PATCH
 * URL: /blogs/:id
 */

const prisma = require("../../lib/prisma");

async function updateBlog(req, res) {

  const id = parseInt(req.params.id);
  const { title, content, cover_image, description, tag } = req.body || {};

  if (!title && !content && !cover_image && !description && !tag) {
    return res.status(400).json({
      success: false,
      message: "No data provided to update"
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid blog id"
    });
  }

  try {

    const existing = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        coverImage: true,
        slug: true,
        isPublished: true,
        description: true,
        tag: true
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (existing.isPublished) {
      return res.status(400).json({
        success: false,
        message: "Published blog cannot be edited"
      });
    }

    const newTitle = title || existing.title;
    const newContent = content || existing.content;
    const newCoverImage = cover_image || existing.coverImage;
    const newDescription = description || existing.description;
    const newTag = tag || existing.tag;

    let newSlug = existing.slug;

    if (title && title !== existing.title) {
      newSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: newTitle,
        slug: newSlug,
        content: newContent,
        coverImage: newCoverImage,
        description: newDescription,
        tag: newTag
      }
    });

    return res.status(200).json({
      success: true,
      message: "Content successfully updated",
      blog: updated
    });

  } catch (err) {



    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Blog with same slug already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error updating value"
    });
  }
}

module.exports = updateBlog;