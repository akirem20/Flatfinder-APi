const jwt = require('jsonwebtoken');
const User = require('../models/user');
const message = require('../models/message');

const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
      return  res.status(404).json({message:'you must logged in'})
    }
   
     const token = authHeader.split(' ')[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id)

            if(!user){
                return res.status(404).json({message:'user not found'})
            }
            req.user = user;
            next();
        }catch(error){
            return res.status(401).json({message:'invalid token'})
        }
}
module.exports = authMiddleware;