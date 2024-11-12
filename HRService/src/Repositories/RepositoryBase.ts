import { Injectable } from "@nestjs/common";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModel from "src/Models/RequestModel";
import RequestModelQuery from 'src/Models/RequestModelQuery';
import Typefinder from "src/Utilities/TypeFinder";

//const objectMapper = require('object-mapper');

import { Repository } from "typeorm";

var pluralize = require('pluralize')



@Injectable()
export class RepositoryBase<TEntity extends EntityBase>{

    //this function refers to function inside AppService where the actual Instance of the Entity is made
    public entityInstanceFunction: any;

    // protected entityName:string;

    protected repository: Repository<TEntity>;

    protected entityName: string;

    constructor() {
       
    }

    async get(requestModelQuery_temp: RequestModelQuery): Promise<RepositoryModel<TEntity>> {

      //  console.log("get Repository")
        //this.repository.findAndCount()

        // const myDataSource = new DataSource(null);
        //only for illustration
       // let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;

        //pluralize the singular word, what is assigned from the derived class
        //example --> super.entityName = 'Employee'; will get converted to 'employees' which 
        //represents the table name

       // console.log(requestModelQuery_temp);
        let requestModelQuery:RequestModelQuery=requestModelQuery_temp==null ? new RequestModelQuery():(requestModelQuery_temp);
        //console.log(requestModelQuery)
        let entity_in_plural_form = pluralize(this.entityName);///required in cfreateQueryBuilder where the resulting 
        ///....................................................................................are more than one
       // console.log(entity_in_plural_form);//....print Employees(TableName)

        
        let query_object = {};
        let query_condition1 = '(';
        let query_condition2='';
        let final_condition='';
        let iCount=0;
        requestModelQuery.filter.conditions.forEach((condition)=>{
        query_object["field_"+(iCount+1)] = condition.field_value;
       // console.log(condition.condition_operator);
        if(condition.condition_operator.localeCompare('and')==0)
        {    
            query_condition1+= condition.field_name + " " + condition.operator_type + " :" + "field_"+(iCount+1)+' and ';  
        }
        else{
            query_condition2+=' or '+condition.field_name + " " + condition.operator_type + " :" + "field_"+(iCount+1);  
        }
            iCount++;    
        });
        final_condition=query_condition1.substring(0,query_condition1.lastIndexOf('and'))
        final_condition+=")"

        iCount=0;

        //console.log('Query Condition ',final_condition)
        //console.log("query_object ",query_object);//.....object like this...{id:6}
       // console.log("query_condition ",query_condition);///.....id =:id

      // var query_with_data=[]
        var query_with_data = requestModelQuery.filter.conditions.length == 0?
        ///...if no condition means length is 0 then findAndCount will be running......
                await this.repository.findAndCount() :
          ///....as condition is one and query object also one so getManyAndCount is running....
                 await this.repository.createQueryBuilder(entity_in_plural_form)
            .where(final_condition, query_object).getManyAndCount();
            //"id = :id"  { id: 2 }

       //console.log("query with data ",query_with_data);

        let temp_data = (this.entityInstanceFunction != null) ? this.entityInstanceFunction() : null;
        //console.log("temp_data ", temp_data);///....it is printing the default///....i think it is not required at all
        let repository_model = new RepositoryModel<TEntity>();//....object of type RepositoryModel
        /*below is the structure */
        repository_model.dataCollection = new Array<TEntity>();
        repository_model.pageInfo = new PageInfo();//..page_size,page_number,total_records
        repository_model.pageInfo.page_size = requestModelQuery.pageInfo.page_size;//...jo humne bheja wo assign kra diya
        repository_model.pageInfo.page_number = requestModelQuery.pageInfo.page_number;//...jo humne bheja wo assign kra diya

        //-- array_from_db --> [Entity[], number_of_records]
        repository_model.pageInfo.total_records = query_with_data != null ? query_with_data[1] : 0;
        //[EntityName {}..., Total number of Records]
        //so at index 1 there willl be the number of records in the database............
        ///and if query_with_data is empty so total records will be 0 

          if (query_with_data != null && query_with_data.length > 0) {
            query_with_data[0].forEach((item) => {
                repository_model.dataCollection.push(item);
            });
            //in dataCollection data is filling one by one...from the query result
        }

        //repository_model.dataCollection.push(temp_data);

        //evaluate the total number of records in database
        return repository_model;
    }

































    //async QueryBuilder(requestModelQuery:RequestModelQuery):
/*
    async get(requestModelQuery: RequestModelQuery): Promise<RepositoryModel<TEntity>> {

        console.log("get Repository")
        //this.repository.findAndCount()

        // const myDataSource = new DataSource(null);
        //only for illustration
       // let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;

        //pluralize the singular word, what is assigned from the derived class
        //example --> super.entityName = 'Employee'; will get converted to 'employees' which 
        //represents the table name

        console.log(requestModelQuery);
        let entity_in_plural_form = pluralize(this.entityName);///required in cfreateQueryBuilder where the resulting 
        ///....................................................................................are more than one
        console.log(entity_in_plural_form);//....print Employees(TableName)

        let query_object = {};
        let query_condition1 = '(';
        let query_condition2='';
        let final_condition='';
        let iCount=0;
        requestModelQuery.filter.conditions.forEach((condition)=>{
        query_object["field_"+(iCount+1)] = condition.field_value;
        console.log(condition.condition_operator);
        if(condition.condition_operator.localeCompare('and')==0)
        {    
            query_condition1+= condition.field_name + " " + condition.operator_type + " :" + "field_"+(iCount+1)+' and ';  
        }
        else{
            query_condition2+=' or '+condition.field_name + " " + condition.operator_type + " :" + "field_"+(iCount+1);  
        }
            iCount++;    
        });
        final_condition=query_condition1.substring(0,query_condition1.lastIndexOf('and'))
        final_condition+=")"

        iCount=0;

        console.log('Query Condition ',final_condition+query_condition2)
        console.log("query_object ",query_object);//.....object like this...{id:6}
       // console.log("query_condition ",query_condition);///.....id =:id

      // var query_with_data=[]
        var query_with_data = requestModelQuery.filter.conditions.length == 0?
        ///...if no condition means length is 0 then findAndCount will be running......
                await this.repository.findAndCount() :
          ///....as condition is one and query object also one so getManyAndCount is running....
                 await this.repository.createQueryBuilder(entity_in_plural_form)
            .where(final_condition, query_object).getManyAndCount();
            //"id = :id"  { id: 2 }

       console.log("query with data ",query_with_data);

        let temp_data = (this.entityInstanceFunction != null) ? this.entityInstanceFunction() : null;
        console.log("temp_data ", temp_data);///....it is printing the default///....i think it is not required at all
        let repository_model = new RepositoryModel<TEntity>();//....object of type RepositoryModel
        /*below is the structure */
       /* repository_model.dataCollection = new Array<TEntity>();
        repository_model.pageInfo = new PageInfo();//..page_size,page_number,total_records
        repository_model.pageInfo.page_size = requestModelQuery.pageInfo.page_size;//...jo humne bheja wo assign kra diya
        repository_model.pageInfo.page_number = requestModelQuery.pageInfo.page_number;//...jo humne bheja wo assign kra diya

        //-- array_from_db --> [Entity[], number_of_records]
        repository_model.pageInfo.total_records = query_with_data != null ? query_with_data[1] : 0;
        //[EntityName {}..., Total number of Records]
        //so at index 1 there willl be the number of records in the database............
        ///and if query_with_data is empty so total records will be 0 

          if (query_with_data != null && query_with_data.length > 0) {
            query_with_data[0].forEach((item) => {
                repository_model.dataCollection.push(item);
            });
            //in dataCollection data is filling one by one...from the query result
        }

        //repository_model.dataCollection.push(temp_data);

        //evaluate the total number of records in database
        return repository_model;
    }*/

    getAll(requestModelQuery: RequestModelQuery): RepositoryModel<TEntity> {

       // const myDataSource = new DataSource(null);
        //temp you can hardcode the data in entity and populate the pageInfo object


        //calling the function delegate if required which is specific to the respective applicaton class
        // if (this.function_delegate != null) {
        //     this.function_delegate();
        // }

        let repositoryModel = new RepositoryModel<TEntity>();
        repositoryModel.pageInfo = new PageInfo();
        repositoryModel.dataCollection = new Array<TEntity>();

        //todo: get objects from db
        let obj = this.entityInstanceFunction;

        repositoryModel.dataCollection.push(obj);

        //evaluate the total number of records in database
        return repositoryModel;
    }

    async post(repositoryModel:RepositoryModel<TEntity>): Promise<RepositoryModel<TEntity>> {
        //post the array of entity stored in datacollection to the database
        console.log("Base Post")
        let entity_in_plural_form = pluralize(this.entityName);
        let responseRepositoryModel = new RepositoryModel<TEntity>();

        //QueryDeepPartialEntity<TEntity>
        let posted_data_in_backend = await this.repository.save(repositoryModel.dataCollection);

        //let temp = await this.internalPost(this.repository, repositoryModel.dataCollection);


        posted_data_in_backend.forEach((data)=>{
            responseRepositoryModel.dataCollection.push(data);
        });
        
        console.log(responseRepositoryModel);
        return responseRepositoryModel;

    }

    async internalPost(internalRepository : Repository<TEntity>, items:Array<EntityBase> ){
        items.forEach(item=>{

            //this will expand the item into its all properties
            let values = Object.values(item);

            values.forEach(value=>{
                if(value instanceof EntityBase){
                    let array_temp = new Array<EntityBase>();
                    let typeof_instance = typeof value;

                    //call the recursive function to do appropriate post or put depending on Id value (if non 0 then PUt, else POST)
                    let typecasted_value = value as EntityBase;

                        
                    
                   
                    //todo: check of array types
                    if(typecasted_value!=null && typecasted_value.id == 0){
                        array_temp.push(typecasted_value);
                       // let entityTarget  = new EntityTarget<
                       // let repo = new Repository()
                       // let result = this.internalPost(..., array_temp);
                    }
                }
            });
            //this will check if the item passed is of type EntityBase
            if(item instanceof EntityBase){

            }

        });
    }

    async put(id:number, repositoryModel:RepositoryModel<TEntity>): Promise<RepositoryModel<TEntity>> {

        let responseRepositoryModel = new RepositoryModel<TEntity>();

        repositoryModel.dataCollection.forEach(async (data)=>{
         
            let data_temp = data as any;

            let updated_data_in_backend = await this.repository.update(id, data_temp);

            responseRepositoryModel.dataCollection.push(updated_data_in_backend.raw);
            
        });
       
        return responseRepositoryModel;

       

    }

    async delete(id:number): Promise<string> {
       
        let deleted_data_in_backend = undefined;
        deleted_data_in_backend= await this.repository.delete(id);
        console.log("deleted data in backend ",deleted_data_in_backend)
        if(deleted_data_in_backend)
        return "DELETED "+" Record ="+id;
    }
}