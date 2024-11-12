import { DepartmentDto } from "./DepartmentDto";
import { DtoBase } from "./DtoBase";
import { EmployeeDto } from "./EmployeeDto";


export class EmployeeDepartmentDto extends DtoBase{


    constructor(){
        super();
    }

    public employee_id:number;
    public department_id:number;
   
    public employee_name:string;
    public employee_age:number;
    public department_name:string;

  
    //mapping Fields
    public employee:EmployeeDto;
    public department:DepartmentDto;
}