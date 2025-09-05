
import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next)=>{
  try {
    const {token} = req.headers
    console.log(token);
    if(!token){
      return res.json({success:false, message:"Unauthorized access login again"})
    }
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
    console.log(verifyToken);
    console.log(process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
    if(verifyToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.json({success:false, message:"Unauthorized access login again"})
    }
    next()
  } catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message})
  }
}

export default adminAuth;