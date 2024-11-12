const PageInfo=require('./PageInfo')
const  Filter =require("./Filter");

class RequestQueryModel {


    constructor() {
      //  console.log("hjhjkhkh")
        this.client_id = '';
        this.filter = new Filter();
        this.pageInfo = new PageInfo()
    }
};

module.exports=RequestQueryModel;
