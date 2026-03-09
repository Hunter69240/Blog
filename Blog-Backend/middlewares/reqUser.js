const jwt=require("jsonwebtoken")
async function requireUser(req, res, next) {
    try {
        
        const {authorization}=req.headers
    
        if(!authorization){
            return res.status(401).json({
                message:"Authorization failed. No access token."
            });
        }

        
        if (!authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: Invalid token format"
            });
        }

        const token=authorization.split(' ')[1]
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
            
        const userId = decoded.id;
    
        
        req.user = decoded;

      
        next();
    } catch (error) {
       
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
            
        });
    }
}

module.exports = requireUser;