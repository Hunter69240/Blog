const express = require("express");
const cors = require('cors');
require('dotenv').config();

const app = express();
const mainRoutes = require("./routes/blog_routes");

app.use(express.json());
app.use(cors());
app.use("/api", mainRoutes);

module.exports = app; // 👈 export only