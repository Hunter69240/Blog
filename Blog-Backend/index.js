const express=require("express");
const {Pool}=require("pg")
require('dotenv').config();
const app=express()
const port=3000

const pool = new Pool({
  user: process.env.DB_USER ,
  host: process.env.DB_HOST, 
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connected to PostgreSQL database!');
 
});
app.get("/",(req,res)=>{
    res.send("Server running");
})

app.listen(port,()=>{
    console.log(`Running in  http://localhost:${port} `)
})