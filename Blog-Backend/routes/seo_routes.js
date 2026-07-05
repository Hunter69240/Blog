const express = require("express");
const router = express.Router();
const { robotsTxt, sitemapXml } = require("../controllers/seoController");

router.get("/robots.txt", robotsTxt);
router.get("/sitemap.xml", sitemapXml);

module.exports = router;