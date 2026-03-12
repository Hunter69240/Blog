const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const mainRoutes = require("./routes/blog_routes");

app.use(express.json({ limit: '1mb' }))  
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use("/api", mainRoutes);

module.exports = app;