import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";
import { DepartmentDto } from "src/Dtos/DepartmentDto";
import { EmployeeDepartmentDto } from "src/Dtos/EmployeeDepartmentDto";
import Department from "src/Entities/Department";
import Employee from "src/Entities/Employee";
import EmployeeDepartment from "src/Entities/EmployeeDepartment";
import { EmployeeDepartmentRepository } from "src/Repositories/EmployeeDepartmentRepository";
import ApplicationService from "./ApplicationService";


@Injectable()
export default class EmployeeDepartmentsService extends ApplicationService<EmployeeDepartment, EmployeeDepartmentDto>{
    constructor(EmployeeDepartmentRepository: EmployeeDepartmentRepository){
        super(EmployeeDepartmentRepository);
    }

    

    public exployee_data_processing_function(){

    }

    CreateEntityInstance(): EmployeeDepartment {
        let emp = new EmployeeDepartment();
        return emp;
    };



    CreateDtoInstance(): EmployeeDepartmentDto {
        let dto =  new EmployeeDepartmentDto();
       
        return dto;
    };

    ConvertDtoToEntity(dto: EmployeeDepartmentDto): EmployeeDepartment {
        let EmployeeDepartment_entity = new EmployeeDepartment();
       EmployeeDepartment_entity.department_id=dto.department_id;
        EmployeeDepartment_entity.employee_id=dto.employee_id;
        return EmployeeDepartment_entity;
        
 
     }
     ConvertEntityToDto(entity: EmployeeDepartment): EmployeeDepartmentDto {
       let EmployeeDepartment_dto = new EmployeeDepartmentDto();
       EmployeeDepartment_dto.department_id=entity.department_id;
       EmployeeDepartment_dto.employee_id=entity.employee_id;
       return EmployeeDepartment_dto;
     }

}