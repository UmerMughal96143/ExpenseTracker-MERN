const jwt = require('jsonwebtoken');


module.exports = (req , res , next) => {
    
    try {
             const token = req.headers.authorization.split(" ")[1];
             console.log(token)
            const deceded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = deceded ;
            next();

        } catch (error) {
            return res.this.status(401).json({
                message : ' Auth FAiled '
            });
        }
        
        


}