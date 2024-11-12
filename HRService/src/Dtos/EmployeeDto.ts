import { DtoBase } from "./DtoBase";
import { EmployeeDepartmentDto } from "./EmployeeDepartmentDto";


export class EmployeeDto extends DtoBase{


    constructor(){
        super();
    }

   
    public age:number;

    
    public name:string;

    public employee_departments:Array<EmployeeDepartmentDto>;


}