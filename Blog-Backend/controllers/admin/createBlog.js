const db=require("../../db")
async function createBlog(req,res){

    const {title,content,cover_image}=req.body

    if (!title  || !content || !cover_image){
        return res.status(400).send({
            message:"Incomplete data"
        })
    }

    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
    
        const query={
            text:"insert into blogs (title,slug,content,cover_image,is_published) values ($1 , $2 , $3 , $4, $5) returning *",
            values:[title,slug,content,cover_image,false]
        }

        try{
            const result=await db.query(query)

            
            return res.status(201).json({
                success:true,
                id:result.rows[0].id
            })
        }catch(error){
            console.log("Inside createBlog catch",error)
            if(error.code === "23505"){
                return res.status(400).json({
                    success:false,
                    message:"Blog with slug already exists"
                })
            }
            return res.status(500).json({
                success:false,
                message:"Error uploading blog"
            })
        }
    
}

module.exports=createBlog