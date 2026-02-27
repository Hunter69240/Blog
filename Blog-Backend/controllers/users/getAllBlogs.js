/*
 * Method: GET
 * URL: /blogs
 * Example URL: /blogs
 * Body: No
 * Params: No
 */

const db=require("../../db")

async function getAllBlogs(req,res){

    const query={
        text:"select id,title,slug,cover_image,created_at from blogs where is_published=true ORDER BY created_at DESC;"
    }
    try{
        const {rows,rowCount} = await db.query(query);
        return res.status(200).json({
            success:true,
            count:rowCount,
            blogs:rows
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Error fetching blogs"
        })
    }
    
}

module.exports=getAllBlogs;