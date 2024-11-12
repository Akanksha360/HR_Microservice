
class Condition {


    constructor() {
        this.field_name = '';
        this.field_value = '';
        this.operator = '';  //can be '=', 'like', '>', '<' , '!=' ** Please handle this while fetching the data 
                            //either from file or database to build relavant query

    }
};

module.exports = Condition;
//export default Condition;