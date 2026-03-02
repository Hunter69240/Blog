const express=require("express");
const cors = require('cors');
require('dotenv').config();
const app=express()
const port=3000
app.use(express.json());
const mainRoutes=require("./routes/blog_routes")

app.use(cors())


app.use("/api",mainRoutes)

app.listen(port,()=>{
    console.log(`Running in  http://localhost:${port} `)
})