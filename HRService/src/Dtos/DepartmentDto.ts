import { DtoBase } from "./DtoBase";
import { EmployeeDepartmentDto } from "./EmployeeDepartmentDto";


export class DepartmentDto extends DtoBase{


    constructor(){
        super();
    }

   
    department_name:string;

    public employee_departments:Array<EmployeeDepartmentDto>;

}