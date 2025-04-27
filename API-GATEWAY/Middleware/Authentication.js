const app=require('express').Router()
const axios=require('axios')
const jwt = require("jsonwebtoken");

module.exports = class Authentication{
    constructor(){  
    
    }
    static async authenticate(req, res, next){
        try{
                const token = req.headers.authorization.split(" ")[1];
                let algo={algorithms:['RS256']};
                const decodedToken =jwt.decode(token, algo)
                let str=decodedToken.iss+".well-known/openid-configuration";
                const allConfig=await axios.get(str,{headers:{authorization: `Bearer ${token}`}})
                const finalUserInfo=await axios.get(allConfig.data.userinfo_endpoint,{headers:{authorization: `Bearer ${token}`}})
                next();   
         }
            catch(error){
                console.log(("error",error))
            }
           
       
    }
    
};


