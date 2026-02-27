const db=require("../../db")

async function updateBlog(req,res){
    const {id}=req.params
    const {title,content,cover_image}=req.body || {}

    if((!title && !content && !cover_image) ){
        return res.status(400).json({
            success:false,
            message:"No data provided to update"
        })
    }

    
    try{
        let query={
            text:"select id, title, content, cover_image, slug, is_published from blogs where id=$1",
            values:[id]
        }

        const existing=await db.query(query)

        if(existing.rows.length === 0 ){
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            })
        }
        
        const blog=existing.rows[0];

        if (blog.is_published) {
            return res.status(400).json({
                success: false,
                message: "Published blog cannot be edited"
            });
        }

        const newTitle=title || blog.title;
        const newContent=content || blog.content;
        const newCoverImage=cover_image || blog.cover_image;
        let newSlug=blog.slug
        if(title && title !== blog.title){
            newSlug=title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/\s+/g, "-");
        }

        query={
            text:"update blogs set title = $1 , slug=$2 , content=$3,cover_image=$4  where id=$5 returning *",
            values:[newTitle,newSlug,newContent,newCoverImage,id]
        }

        const updated=await db.query(query)

        
        return res.status(200).json({
            success:true,
            message:"Content successfully updated",
            blog:updated.rows[0]
        })
        
    }catch(err){
        console.log(err)
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Blog with same title already exists"
            });
        }
        return res.status(500).json({
            success:false,
            message:"Error updating value"
        })
    }
    
}

module.exports=updateBlog