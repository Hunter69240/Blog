const db=require("../db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req,res){
    const email=req.body.email.trim()
    const password=req.body.password

    
    if(!email || !password){
       res.status(400).send({
            message:"Email or password missing"
       })
       return
    }

    const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
    };

    try {
        
        const result = await db.query(query);
        
        
        if (result.rows.length === 0){
            res.status(401).send({
            message:"Invalid credentials"
            })
            return
        }
        const user=result.rows[0]
        const hashedPassword=user.password_hash
        
        const isMatch=await bcrypt.compare(password,hashedPassword);

        if(! isMatch){
             res.status(401).send({
            message:"Invalid password"
            })
            return
        }

        const payload={
            id:user.id,
            email:email,
            
        }

        const secretKey=process.env.JWT_SECRET
        const options = { expiresIn: process.env.JWT_EXPIRES_IN }

        const token=jwt.sign(payload,secretKey,options)
        res.send({
            message:"Login successful",
            token:token,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "authController - 53 Internal server error" });
    }

}

module.exports=login