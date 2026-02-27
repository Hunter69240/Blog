/*
 * Method: PATCH
 * URL: /blogs/:id/unpublish
 * Example URL: /blogs/1/unpublish
 * Body: No
 * Params: Yes (id)
 */

const db=require("../../db")

async function unPublishBlog(req,res){
   
    const {id}=req.params
    try{
        const query={
            text:"update blogs set is_published=false where id=$1 and is_published=true returning *",
            values:[id]
        }
        const result =await db.query(query)

        if (result.rows.length === 0){
            return res.status(400).json({
                success: false,
                message: "Blog not found or already in draft"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Unpublished blog",
            blog:result.rows[0]
        })
    }catch(err){
        console.log("unPublishBlog error ",err)
        return res.status(500).json({
            success:false,
            message:"Error taking down blog"
        })
    }   
}

module.exports=unPublishBlog