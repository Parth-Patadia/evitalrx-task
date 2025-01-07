const jwt = require('jsonwebtoken');

const JWT_SECRET = "SDSFDGDfdghfyhfjgghjgjyiy";

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Access denied'});
    }
        
    try{
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(400).json({error: 'Invalid token'});
    }
};

module.exports = {authenticateToken};