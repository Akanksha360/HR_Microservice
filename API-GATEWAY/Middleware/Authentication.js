const app=require('express').Router()
const {expressjwt}=require('express-jwt')
const jwks=require('jwks-rsa')
const axios=require('axios')
const jwt = require("jsonwebtoken");


module.exports = class Authentication{

    constructor(){  
    
    }
    static async authenticate(req, res, next){
        try{
                //console.log(req.headers);
                const token = req.headers.authorization.split(" ")[1];
               // console.log(token)
                let algo={algorithms:['RS256']};
                const decodedToken =jwt.decode(token, algo)
               /// console.log(decodedToken)
               // console.log(decodedToken.iss)
                let str=decodedToken.iss+".well-known/openid-configuration";
               // console.log(str)
                const allConfig=await axios.get(str,{headers:{authorization: `Bearer ${token}`}})
               // console.log(allConfig.data.userinfo_endpoint);
                const finalUserInfo=await axios.get(allConfig.data.userinfo_endpoint,{headers:{authorization: `Bearer ${token}`}})
               // console.log("Final")
                console.log(finalUserInfo.data);
                // req.email=finalUserInfo.data.email;
                //     req.name=finalUserInfo.data.name
                    next();
            
                // if(finalUserInfo.data.email.localeCompare('akanksha.ruchi2606@gmail.com')==0&&finalUserInfo.data.name.localeCompare('Akanksha')==0||finalUserInfo.data.email.localeCompare('akanksharuchi26@gmail.com')==0&&finalUserInfo.data.name.localeCompare('Akanksha')==0)
                // {
                //     console.log("Valid Credentials");
                //     req.email=finalUserInfo.data.email;
                //     req.name=finalUserInfo.data.name
                //     next();
                // }
                // else{
                //     console.log("InValid Credentials");
                //     res.send("Invalid Credentials")
                //     res.end();
                // }    
         }
            catch(error){
                console.log(("error",error))
            }
           
       
    }
    
};


