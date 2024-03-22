const jwt = require('jsonwebtoken') 
const pvt_key='admin123';
function generateUserToken(id,role){
    return jwt.sign({ _id:id,role:role }, pvt_key)
}
function verifyUserToken(token){
    try{
        return jwt.verify(token,pvt_key)
    }
    catch(err){
        return null
    }
    
}
module.exports={generateUserToken,verifyUserToken}