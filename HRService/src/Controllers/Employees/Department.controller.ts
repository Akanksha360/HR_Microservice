import { Controller, Get, NotFoundException, Param, Query,Put,Delete, Post } from '@nestjs/common';
import { syncBuiltinESMExports } from 'module';
import DepartmentAppService from 'src/AppService/DepartmentService';
import { DepartmentDto } from 'src/Dtos/DepartmentDto';
import { DepartmentFacade } from 'src/Facade/DepartmentFacade';
import RequestModelQuery from 'src/Models/RequestModelQuery';
import RequestModel from 'src/Models/RequestModel';
import ResponseModel from "src/Models/ReponseModel";
import { DtoBase } from "src/Dtos/DtoBase";
import {Utility} from '../../rmq/utility'
import { response } from 'express';
var utility = Utility.getInstance();
import { Headers,Body } from '@nestjs/common';

@Controller('Department')
export class DepartmentController <TDto extends DtoBase>{



  constructor(private readonly DepartmentFacade: DepartmentFacade) {

    //console.log('printing Department Facade');
   // console.log(DepartmentFacade);
   // console.log('Initializing Department Controller Constructor');
   // this.listner();
   this.onModuleInit();
  }
  onModuleInit() {
    console.log('Initializing Departemtnt Controller');


    utility.listenToServices("HR_SERVICE",async (res:any)=>{//listen if HR_Service is the subscriber
      if(res)
      {
        if(res.topicName.split("_")[0].localeCompare("DEPARTMENT")==0)//checking if in HRService the topic name is Employee 
        {
          console.log("Deoartemnt is listening")
            switch(res.topicName.split("_")[1])//Switching by TopicName--->ADD DELETE UPDATE 
            {
              case 'ADD':
                console.log(res.message)
                let reponse=await this.DepartmentFacade.Post(res.message);
                //Publishing the Response Back to the API-Gateway on the Topic=res.OnSuccessTopicsToPush[0]=EMPLOYEE_ADDED
                utility.PublicMessageToTopic(res.OnSuccessTopicsToPush[0],reponse.dataCollection)
                break;

              case 'UPDATE':
                let response=await this.DepartmentFacade.Put(res.message.id,res.message.requestModel);
                //Publishing the Response Back to the API-Gateway on the Topic=res.OnSuccessTopicsToPush[0]=EMPLOYEE_UPDATED
                utility.PublicMessageToTopic(res.OnSuccessTopicsToPush[0],response)
                break;
              
              case 'DELETE':
                //console.log(res.message)
                let result=await this.DepartmentFacade.Delete(res.message);
                //Publishing the Response Back to the API-Gateway on the Topic=res.OnSuccessTopicsToPush[0]=EMPLOYEE_UPDATED
                utility.PublicMessageToTopic(res.OnSuccessTopicsToPush[0],result)
                break;
            }
        }
      }
   })
}


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @Get()
  getDepartments(@Headers()headers: any): Promise<ResponseModel<DepartmentDto>> {
    console.log("Get Controller ")
    let requestModelQuery_temp: RequestModelQuery;//created object of type RequestModelQuery
    /*
    this.pageInfo = new PageInfo();
    this.filter = new Filter();
    */
    //....if null then create default of RequestModelQuery else parse whatever we send.........
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
    console.log("requestModelQuery ",requestModelQuery_temp);
    let response = this.DepartmentFacade.Get(requestModelQuery_temp);
    console.log(response)
    return response;
}

@Post()
post(@Body()data:any):Promise<ResponseModel<DepartmentDto>>
{
  console.log('post Controller')
  let requestModel=new  RequestModel<DepartmentDto>();//dont want to give id
  requestModel.dataCollection = new Array<DepartmentDto>();
  data.map((e)=>{
    requestModel.dataCollection.push(e);
  })
  console.log(requestModel.dataCollection)
  let response = this.DepartmentFacade.Post(requestModel);
  return response;
}

@Put()
put(@Headers() headers:any,@Body() data:any): Promise<ResponseModel<DepartmentDto>> {
    console.log("Put Controller");
    let requestModelQuery_temp:RequestModelQuery;
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
    console.log("requestModelQuery ",requestModelQuery_temp);

    let requestModel=new RequestModel<DepartmentDto>();
    requestModel.dataCollection=new Array <DepartmentDto>();
    data.map((e)=>{
      requestModel.dataCollection.push(e);
    })
    let response = this.DepartmentFacade.Put(requestModelQuery_temp.filter.conditions[0].field_value,requestModel);
    return ;
}
  @Delete()
  delete(@Headers() headers:any):string
  {
    console.log("Delete called")
    let requestModelQuery_temp:RequestModelQuery;
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
    console.log("requestModelQuery ",requestModelQuery_temp);
    let res=this.DepartmentFacade.Delete(requestModelQuery_temp.filter.conditions[0].field_value);
    return "Deleted";
  }

  @Get('/:id')
  get(@Param('id') id: number): string {
    return "sss";
  }

  //post 
  // dto --> entity --> db
  // db --> entity --> dto
  


}
