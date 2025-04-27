import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";
import { EmployeeDepartmentDto } from "src/Dtos/EmployeeDepartmentDto";
import { EmployeeDto } from "src/Dtos/EmployeeDto";
import Employee from "src/Entities/Employee";
import EmployeeDepartment from "src/Entities/EmployeeDepartment";
import { EmployeeRepository } from "src/Repositories/EmployeeRepository";
import { RepositoryBase } from "src/Repositories/RepositoryBase";
import ApplicationService from "./ApplicationService";


@Injectable()
export default class EmployeeAppService extends ApplicationService<Employee, EmployeeDto>{

    constructor(employeeRepository: EmployeeRepository) {
        super(employeeRepository);
    }
    public exployee_data_processing_function() {

    }
    CreateEntityInstance(): Employee {
        let emp = new Employee();
        emp.id = 34;
        emp.age = 45;
        emp.name = 'xyz';
        return emp;
    };



    CreateDtoInstance(): EmployeeDto {
        let dto = new EmployeeDto();
        //let emp = new Employee();
        dto.id = 34;
        dto.age = 45;
        dto.name = 'xyz';
        return dto;
    };

    ConvertDtoToEntity(dto: EmployeeDto): Employee {
        let employee_entity = new Employee();

        console.log("DTOOOOOOOO ",dto)
        employee_entity.id = dto.id;
        employee_entity.age = dto.age;
        employee_entity.name = dto.name;
       if(dto.employee_departments!=null)
        {
            employee_entity.employeesdepartments = new Array<EmployeeDepartment>();

            dto.employee_departments.forEach(employee_department_dto => {
            let employee_department = new EmployeeDepartment();

            employee_department.id = employee_department_dto.id;
            employee_department.department_id = employee_department_dto.department_id;
            employee_department.employee_id = employee_department_dto.employee_id;

            employee_entity.employeesdepartments.push(employee_department);
            
            });
            return employee_entity;
        }
        else{
            return employee_entity;
        }

       


    }
    ConvertEntityToDto(entity: Employee): EmployeeDto {
        let employee_dto = new EmployeeDto();
        employee_dto.id = entity.id;
        employee_dto.age = entity.age;
        employee_dto.name = entity.name;

        employee_dto.employee_departments = new Array<EmployeeDepartmentDto>();

        if(entity.employeesdepartments!=null)
        {
            entity.employeesdepartments.forEach(employee_department_entity => {
            let employee_department_dto = new EmployeeDepartmentDto();
            employee_department_dto.id = employee_department_dto.id;
            employee_department_dto.department_name = employee_department_entity.department != null ?
                employee_department_entity.department.department_name : "";

            employee_department_dto.employee_name = employee_department_entity.employee != null ?
                employee_department_entity.employee.name : "";

            employee_department_dto.department_id = employee_department_entity.department_id;
            employee_department_dto.employee_id = employee_department_entity.employee_id;


            employee_dto.employee_departments.push(employee_department_dto);
            });

            return employee_dto;
        }
        else
        {
            return employee_dto;
        }
    }





}