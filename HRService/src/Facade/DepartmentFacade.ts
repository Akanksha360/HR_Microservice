import { Injectable } from "@nestjs/common";
import DepartmentService from "src/AppService/DepartmentService";
import { DepartmentDto } from "src/Dtos/DepartmentDto";
import Department from "src/Entities/Department";
import FacadeBase from "./FacadeBase";

@Injectable()
export class DepartmentFacade  extends FacadeBase<DepartmentDto, Department>
{
    constructor(private readonly empAppService:DepartmentService){
        super(empAppService);
        
       // console.log('printing empAppService class ');
       // console.log(empAppService);
        //console.log(DepartmentFacade);
       // super(DepartmentAppService ?? new DepartmentAppService());
    }


}