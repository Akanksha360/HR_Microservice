const PageInfo=require('./PageInfo')
const  Filter =require("./Filter");

class RequestQueryModel {
    constructor() {
        this.client_id = '';
        this.filter = new Filter();
        this.pageInfo = new PageInfo()
    }
};
module.exports=RequestQueryModel;

