const PageInfo=require("./PageInfo");

class ResponseModel {

    constructor() {
        this.client_id = '';
        this.dataCollection=[]; 
        this.pageInfo = new PageInfo();

    }
};
module.exports=ResponseModel;