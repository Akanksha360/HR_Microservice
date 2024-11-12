import ApplicationService from "src/AppService/ApplicationService";
import { DtoBase } from "src/Dtos/DtoBase";
import { EntityBase } from "src/Entities/EntityBase";
import ResponseModel from "src/Models/ReponseModel";
import RequestModel from "src/Models/RequestModel";///class with datacollection only
import RequestModelQuery from "src/Models/RequestModelQuery";



export default class FacadeBase<TDto extends DtoBase, TEntity extends EntityBase>{

    private applicationService: ApplicationService<TEntity, TDto>;

    constructor(private readonly applicationService_temp: ApplicationService<TEntity, TDto>) {
        this.applicationService = applicationService_temp;
    }

    async GetById(id: number): Promise<ResponseModel<TDto>> {

        //call the app service which will return promise of TDto
        return;
    }

    async Get(requestModelQuery:RequestModelQuery):Promise<ResponseModel<TDto>>{
    //Get(requestModelQuery: RequestModelQuery): ResponseModel<TDto> {

        console.log("Facade Get")
        let responseModel = await this.applicationService.Get(requestModelQuery);
        // let responseModel = new ResponseModel<TDto>();

        // x.then((value) => {
        //     console.log(value);
        //     responseModel = value;
        // });
        
        // console.log(x);
        // let y = typeof x;
        // console.log(y);

        //call the app service which will return promise of TDto
        return responseModel;
    }
    async Post(requestModel: RequestModel<TDto>): Promise<ResponseModel<TDto>> {

        console.log("postfacade")
        console.log("request model ",(requestModel));

        let response=await this.applicationService.Post(requestModel)
        
        return response;
    }
    async Put(id: number, requestModel: RequestModel<TDto>): Promise<ResponseModel<TDto>> {

        console.log("Put facade")
        //call the app service which will return promise of TDto
      //  let data={id:1,age:20,name:"hello"}
       // let dto=await this.applicationService.CreateDtoInstance(data);
      //  console.log(dto) 
       // let a =new 
      //  requestModel.dataCollection.push(dto);
        let response=await this.applicationService.Put(id,requestModel)
        return response;
    }


/*    async Post(requestModel: RequestModel<TDto>): Promise<ResponseModel<TDto>> {

        let data={};
        let dto=await this.applicationService.CreateDtoInstance(data);
        console.log(dto)
       // let a =new 
        requestModel.dataCollection.push(dto);
        let response=await this.applicationService.Post(requestModel)
        // let requestModel_temp = new RequestModel<TEntity>();
        // requestModel_temp.dataCollection = 
        //RRequestModel<TDto> to RequestModel<Entities>
        //call the app service which will return promise of TDto

        //this.applicationService.Post()
        return response;
    }*/

    // async convertDtoToEntites():Array<TEntity>{

    // }
/*
    async Put(id: number, requestModel: RequestModel<TDto>): Promise<ResponseModel<TDto>> {

        console.log("Put facade")
        //call the app service which will return promise of TDto
        let data={id:1,age:20,name:"hello"}
        let dto=await this.applicationService.CreateDtoInstance(data);
        console.log(dto)
       // let a =new 
        requestModel.dataCollection.push(dto);
        let response=await this.applicationService.Put(2,requestModel)
        return response;
    }*/

    async Delete(id: number): Promise<string> {

        console.log("Delete ID",id)
        //call the app service which will return promise of TDto
        let res=await this.applicationService.Delete(id)
        return res;
    }
}