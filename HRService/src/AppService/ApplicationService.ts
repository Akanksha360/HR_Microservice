import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { DtoBase } from "src/Dtos/DtoBase";
import { EntityBase } from "src/Entities/EntityBase";
import Condition from "src/Models/Condition";
import ResponseModel from "src/Models/ReponseModel";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModel from "src/Models/RequestModel";
import RequestModelQuery from "src/Models/RequestModelQuery";
import { RepositoryBase } from "src/Repositories/RepositoryBase";


@Injectable()
export default abstract class ApplicationService<TEntity extends EntityBase, TDto extends DtoBase>{

    protected repository:RepositoryBase<TEntity>;

    constructor(repository:RepositoryBase<TEntity>){
        this.repository = repository;
       // console.log('printing the repository');
       // console.log(this.repository);

        if(this.repository!=null){
            this.repository.entityInstanceFunction = this.CreateEntityInstance;
        }
    }

    abstract CreateEntityInstance():TEntity;

    abstract CreateDtoInstance():TDto;


    /** Every Application Service class has to implement this as per their DTO & Entity for proper conversion */
    abstract ConvertDtoToEntity(dto:TDto):TEntity;

    /** Every Application Service class has to implement this as per their DTO & Entity for proper conversion */
    abstract ConvertEntityToDto(entity:TEntity):TDto;

    async GetById(id:number):Promise<ResponseModel<TDto>>{

        let requestModelQuery = new RequestModelQuery();
        requestModelQuery.filter.conditions.push({
            field_name:'id',
            field_value:id,
            operator_type : '=',
            condition_operator:''
        })

        //example we get data in the for of Array<TEntity> in this case its Array<Employee>
        var repositoryModel = await this.repository.get(requestModelQuery);
        //convert the repository model to REponseModel<TDto> and then return to the user.
        let responseModel = new ResponseModel<TDto>();
        responseModel.dataCollection = new Array<TDto>();
        responseModel.pageInfo = repositoryModel.pageInfo;

        repositoryModel.dataCollection.forEach(element => {
            let dto = this.ConvertEntityToDto(element);
            responseModel.dataCollection.push(dto);

        }); 
       //call the repo of type TEntity which will return promise of TDto
        return responseModel;
    }

    async Get(requestModelQuery:RequestModelQuery):Promise<ResponseModel<TDto>>{
        let repository_model = await this.repository.get(requestModelQuery);

        //convert the repository model to REponseModel<TDto> and then return to the user.
        let responseModel = new ResponseModel<TDto>();
        responseModel.dataCollection = new Array<TDto>();
        responseModel.pageInfo = repository_model.pageInfo;

        repository_model.dataCollection.forEach(element => {
            let dto = this.ConvertEntityToDto(element);
            responseModel.dataCollection.push(dto);

        }); 
        return responseModel;
    }

    async Post(requestModel:RequestModel<TDto>):Promise<ResponseModel<TDto>>{

        let responseModel = new ResponseModel<TDto>();

        console.log(requestModel);
        let repositoryModel = new RepositoryModel<TEntity>();
        requestModel.dataCollection.forEach((dto)=>{
            let entity = this.ConvertDtoToEntity(dto);
            repositoryModel.dataCollection.push(entity);
        });
        console.log("reposotoyr model in application service ",repositoryModel)
        let repository_model_from_db = await this.repository.post(repositoryModel);

        repository_model_from_db.dataCollection.forEach((entity)=>{
            let dto = this.ConvertEntityToDto(entity);
            responseModel.dataCollection.push(dto);
        });
        return responseModel;
    }

    convertDtoToEntites(dtos:Array<TDto> ):Array<TEntity>{
        let array_of_tEntities = new Array<TEntity>();
        return array_of_tEntities;
    }

    async Put(id:number, requestModel:RequestModel<TDto>):Promise<ResponseModel<TDto>>{

        //call the app service which will return promise of TDto
        let responseModel = new ResponseModel<TDto>();

        let repositoryModel = new RepositoryModel<TEntity>();
        let iCount=0;
        requestModel.dataCollection.forEach((dto)=>{
            let entity = this.ConvertDtoToEntity(dto);
            //doing it only for the first element, mostly there will be single top level object
            entity.id = iCount == 0? id: entity.id;
            repositoryModel.dataCollection.push(entity);
            iCount++;
        });

         //sending the list of entity to the repository post method
        let repository_model_from_db = await this.repository.put(id,repositoryModel);

        repository_model_from_db.dataCollection.forEach((entity)=>{
            let dto = this.ConvertEntityToDto(entity);
            responseModel.dataCollection.push(dto);
        });
        return responseModel;
    }

    async Delete(id:number):Promise<string>{

        //call the app service which will return promise of TDto
        let res=await this.repository.delete(id);
        return res;
    }
}


