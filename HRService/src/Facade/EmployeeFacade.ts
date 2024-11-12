import { Injectable } from "@nestjs/common";
import EmployeeAppService from "src/AppService/EmployeeAppService";
import { EmployeeDto } from "src/Dtos/EmployeeDto";
import Employee from "src/Entities/Employee";
import FacadeBase from "./FacadeBase";

@Injectable()
export class EmployeeFacade  extends FacadeBase<EmployeeDto, Employee>
{
    constructor(private readonly empAppService:EmployeeAppService){
        super(empAppService);
        
       // console.log('printing empAppService class ');
        //console.log(empAppService);
        //console.log(employeeFacade);
       // super(employeeAppService ?? new EmployeeAppService());
    }


}