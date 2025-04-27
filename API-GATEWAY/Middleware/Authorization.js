module.exports = class Authorization{

    //res.locals--->hold request over the life of request
    constructor(){
    }
    static authorize(request, response, next){
        next();
    }
};


