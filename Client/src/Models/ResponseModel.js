const PageInfo=require("./PageInfo");

class ResponseModel {

///////..........ye client ko bheja jayega...............///////////////// 
    constructor() {
        this.client_id = '';
        /**
         * This will be the collection that will hold the relvant data
         */
        this.dataCollection=[]; 
        this.pageInfo = new PageInfo();

    }
};

module.exports= ResponseModel;