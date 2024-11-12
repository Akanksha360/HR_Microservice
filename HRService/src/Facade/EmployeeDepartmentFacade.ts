import { Injectable } from "@nestjs/common";
import EmployeeDepartmentsService from "src/AppService/EmployeeDepartmentService";
import { DepartmentDto } from "src/Dtos/DepartmentDto";
import { EmployeeDepartmentDto } from "src/Dtos/EmployeeDepartmentDto";
import EmployeeDepartment from "src/Entities/EmployeeDepartment";
import Employee from "src/Entities/Employee";
import FacadeBase from "./FacadeBase";

@Injectable()
export class EmployeeDepartmentFacade  extends FacadeBase<EmployeeDepartmentDto, EmployeeDepartment>
{
    constructor(private readonly employeeDepartmentService:EmployeeDepartmentsService){
        super(employeeDepartmentService);
        
      //  console.log('printing empAppService class ');
       // console.log(employeeDepartmentService);
        //console.log(employeeFacade);
       // super(EmployeeDepartmentsService ?? new EmployeeDepartmentsService());
    }


}