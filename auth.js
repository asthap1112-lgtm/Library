const jwt = require('jsonwebtoken');
const user = require('../models/user');
const auth = async (req , rews, next) =>{
    try{
        const header = req.header('Authorization');
    if (!header)
        return 
    res.status(401).json({message: 'No token provided'});
     const decoded = jwt.verify(Token, process.env.JWT_SECRET);
     const user = await UserActivation.findById(decoded.id).select('-password');
     if (!user)
        return
    res.status(401).json ({message: 'Invalid token' });
    req.user = user;
    next();
    } catch (error){
        res.status(401).json({ message: 'Token is not valid'});
    }
};
module.exports = auth;