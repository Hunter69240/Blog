const db=require("../../db")

async function getBlogBySlug(req,res){
    const {slug}=req.params
    const query= {
        text:"select id,title,content,cover_image,created_at,updated_at from blogs where slug = $1 and is_published=true",
        values:[slug]
    }
    try{
        const {rows,rowCount} =await db.query(query);
        if(rowCount === 0){
            return res.status(404).json({
                success:false,
                message:"Blog doesnt exist"
            })
        }

        return res.status(200).json({
            success:true,
            blog:rows[0]
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Error fetching blog"
        })
    }
    
    
}

module.exports=getBlogBySlug