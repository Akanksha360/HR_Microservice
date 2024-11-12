import { Controller, Get, NotFoundException, Param, Query,Put,Delete, Post } from '@nestjs/common';
import { syncBuiltinESMExports } from 'module';
import EmployeeAppService from 'src/AppService/EmployeeAppService';
import { EmployeeDto } from 'src/Dtos/EmployeeDto';
import { EmployeeFacade } from 'src/Facade/EmployeeFacade';
import RequestModelQuery from 'src/Models/RequestModelQuery';
import { EmployeesService } from 'src/Services/employees.service';
import RequestModel from 'src/Models/RequestModel';
import ResponseModel from "src/Models/ReponseModel";
import { DtoBase } from "src/Dtos/DtoBase";
import { EventPattern,MessagePattern } from '@nestjs/microservices';
import { Headers,Body } from '@nestjs/common'
import amqp from 'amqplib/callback_api'
import {Utility} from '../../rmq/utility'
import { response } from 'express';
var utility = Utility.getInstance();
@Controller('Employee')
export class EmployeesController <TDto extends DtoBase>{

public a=null;

  constructor(private readonly employeeFacade: EmployeeFacade) {

   // console.log('printing Employee Facade');
   // console.log(employeeFacade);
   // console.log('Initializing Employee Controller Constructor');
    this.onModuleInit()
  }
  
  
  onModuleInit() {
   // console.log('Initializing Employee Controller');


    utility.listenToServices("HR_SERVICE",async (res:any)=>{//listen if HR_Service is the subscriber
      if(res)
      {
        if(res.topicName.split("_")[0].localeCompare("EMPLOYEE")==0)//checking if in HRService the topic name is Employee 
        {
            switch(res.topicName.split("_")[1])//Switching by TopicName--->ADD DELETE UPDATE 
            {
              case 'ADD':
               // console.log(res.message)
                let reponse=await this.employeeFacade.Post(res.message);
                //Publishing the Response Back to the API-Gateway on the Topic=res.OnSuccessTopicsToPush[0]=EMPLOYEE_ADDED
                utility.PublicMessageToTopic(res.OnSuccessTopicsToPush[0],reponse.dataCollection)
                break;

              case 'UPDATE':
                let response=await this.employeeFacade.Put(res.message.id,res.message.requestModel);
                //Publishing the Response Back to the API-Gateway on the Topic=res.OnSuccessTopicsToPush[0]=EMPLOYEE_UPDATED
                utility.PublicMessageToTopic(res.OnSuccessTopicsToPush[0],response)
                break;
              
              case 'DELETE':
                //console.log(res.message)
                let result=await this.employeeFacade.Delete(res.message);
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
  getEmployees(@Headers()headers: any): Promise<ResponseModel<EmployeeDto>> {
  //  console.log("Get Controller ")
    let requestModelQuery_temp: RequestModelQuery;
  //  console.log(JSON.stringify(headers['requestmodelquery']))
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
   // console.log("requestModelQuery ",requestModelQuery_temp);
    let response = this.employeeFacade.Get(requestModelQuery_temp);
   // console.log(response)
    return response;
}

@Post()
post(@Body()data:any):Promise<ResponseModel<EmployeeDto>>
{
 // console.log('post Controller')
  let requestModel=new  RequestModel<EmployeeDto>();//dont want to give id
  requestModel.dataCollection = new Array<EmployeeDto>();
  data.map((e)=>{
    requestModel.dataCollection.push(e);
  })
 // console.log(requestModel.dataCollection)
  let response = this.employeeFacade.Post(requestModel);
  return response;
}

@Put()
put(@Headers() headers:any,@Body() data:any): Promise<ResponseModel<EmployeeDto>> {
  //  console.log("Put Controller");
    let requestModelQuery_temp:RequestModelQuery;
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
   // console.log("requestModelQuery ",requestModelQuery_temp.filter.conditions[0]);
    let requestModel=new RequestModel<EmployeeDto>();
    requestModel.dataCollection=new Array <EmployeeDto>();
    data.map((e)=>{//array of objects
      requestModel.dataCollection.push(e);
    })
    let response = this.employeeFacade.Put(requestModelQuery_temp.filter.conditions[0].field_value,requestModel);
    return response;
}

 @Delete()
  delete(@Headers() headers:any):string
  {
   // console.log("Delete called")
    let requestModelQuery_temp:RequestModelQuery;
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
    JSON.parse(headers['requestmodelquery']);
   // console.log("requestModelQuery ",requestModelQuery_temp);
    let res=this.employeeFacade.Delete(requestModelQuery_temp.filter.conditions[0].field_value);
    return "Deleted";
  }

  @Get('/:id')
  get(@Param('id') id: number): string {
    //return this.employeesService.get(id);
    return "sss";
  }

  //post 
  // dto --> entity --> db
  // db --> entity --> dto
  

}
/** */