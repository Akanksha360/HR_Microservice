import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";
import { DepartmentDto } from "src/Dtos/DepartmentDto";
import Department from "src/Entities/Department";
import { DepartmentRepository } from "src/Repositories/DepartmentRepository";
import { RepositoryBase } from "src/Repositories/RepositoryBase";
import ApplicationService from "./ApplicationService";

@Injectable()
export default class DepartmentService extends ApplicationService<Department, DepartmentDto>{
    
    constructor(DepartmentRepository: DepartmentRepository){
        super(DepartmentRepository);
        
    }

    public exployee_data_processing_function(){

    }

    CreateEntityInstance(): Department {
        let emp = new Department();
        return emp;
    };



    CreateDtoInstance(): DepartmentDto {
        let dto =  new DepartmentDto();
         return dto;
    };

    ConvertDtoToEntity(dto: DepartmentDto): Department {
       let Department_entity = new Department();
       Department_entity.department_name=dto.department_name;
       return Department_entity;
       

    }
    ConvertEntityToDto(entity: Department): DepartmentDto {
        let Department_dto = new DepartmentDto();
        Department_dto.department_name=entity.department_name
        return Department_dto;
    }
    
    



}