const axios = require("axios");

const notifyIndexNow = async (slug) => {
  try {
    await axios.post("https://api.indexnow.org/indexnow", {
      host: "blog.aadishds.live",
      key: process.env.INDEXNOW_KEY,
      keyLocation: `https://blog.aadishds.live/${process.env.INDEXNOW_KEY}.txt`,
      urlList: [`https://blog.aadishds.live/blog/${slug}`],
    });
    console.log(`IndexNow: notified for /blog/${slug}`);
  } catch (err) {
    console.error("IndexNow ping failed:", err.message);
  }
};

module.exports = notifyIndexNow;