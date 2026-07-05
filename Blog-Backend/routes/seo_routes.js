const express = require("express");
const router = express.Router();
const { robotsTxt, sitemapXml, indexNowKeyFile } = require("../controllers/seoController");

router.get("/robots.txt", robotsTxt);
router.get("/sitemap.xml", sitemapXml);
router.get("/:key.txt", indexNowKeyFile);

module.exports = router;