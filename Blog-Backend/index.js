const express=require("express");

require('dotenv').config();
const app=express()
const port=3000
app.use(express.json());
const mainRoutes=require("./routes/blog_routes")




app.use("/api",mainRoutes)

app.listen(port,()=>{
    console.log(`Running in  http://localhost:${port} `)
})