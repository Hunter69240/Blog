/*
 * Method: PATCH
 * URL: /blogs/:id/publish
 * Example URL: /blogs/1/publish
 * Body: No
 * Params: Yes (id)
 */

const db=require("../../db")

async function publishBlog(req,res){
   
    const {id}=req.params
    try{
        const query={
            text:"update blogs set is_published=true where id=$1 and is_published=false returning *",
            values:[id]
        }
        const result =await db.query(query)

        if (result.rows.length === 0){
            return res.status(400).json({
                success: false,
                message: "Blog not found or already published"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Published blog",
            blog:result.rows[0]
        })
    }catch(err){
        console.log("publishBlog error ",err)
        return res.status(500).json({
            success:false,
            message:"Error publishing blog"
        })
    }
    

    
}

module.exports=publishBlog