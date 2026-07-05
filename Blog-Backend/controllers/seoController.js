const prisma = require("../lib/prisma");

const robotsTxt = (req, res) => {
  res.type("text/plain").send(
`User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://blog.aadishds.live/sitemap.xml`
  );
};

const sitemapXml = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const urls = blogs.map(b => `
  <url>
    <loc>https://blog.aadishds.live/blog/${b.slug}</loc>
    <lastmod>${b.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blog.aadishds.live/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${urls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send("Could not generate sitemap");
  }
};

module.exports = { robotsTxt, sitemapXml };