module.exports = class Authorization{

    //res.locals--->hold request over the life of request
    constructor(){

    }

    static authorize(request, response, next){
        console.log("email ",request.email)
        console.log("name ",request.name)
        next();
    }
};


