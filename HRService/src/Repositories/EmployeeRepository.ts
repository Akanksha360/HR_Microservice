import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Employee from "src/Entities/Employee";
import EmployeeDepartment from "src/Entities/EmployeeDepartment";
import RepositoryModel from "src/Models/RepositoryModel";
import { DataSource, Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";

@Injectable()
export class EmployeeRepository extends RepositoryBase<Employee>{

   // public entityInstanceFunction: any;

    constructor(@InjectRepository(Employee)private readonly employeeRepository: Repository<Employee>, 
    ////here i did some changes
            @InjectRepository(Employee)private readonly employeeDepartmentRepository: Repository<EmployeeDepartment>) {
        //@InjectRepository(Employee)private readonly usersRepository: Repository<Employee> to the base constructor
        super();
        super.repository = employeeRepository;
        super.entityName = 'Employee';
    }

   /* override async post(repositoryModel: RepositoryModel<Employee>): Promise<RepositoryModel<Employee>> {
        //let entity_in_plural_form = pluralize(this.entityName);
        //console.log("Overide Post")
        let responseRepositoryModel = new RepositoryModel<Employee>();

        console.log("repository model in iveride ",repositoryModel)
        

        repositoryModel.dataCollection.forEach(async data=>{
            //first save the Employee without the children
            let result_employee_save = await this.employeeRepository.save(data);//done

            //updating the database id to the id of the data

            data.id = result_employee_save.id;
          //  console.log("data in overide ",data)

            //saving the employee_departments
            data.employeesdepartments.forEach(async employee_department=>{

                employee_department.employee_id = data.id;
                //assuming the department_id is already populated inside 'employee_department'
                let result_employee_department = await this.employeeDepartmentRepository.save(employee_department); 
            });

            //this is to be done in 'employee_department' repo class
            //first check if id is 0 for employee object then do post for employee else put
            //first check if id is 0 for department object then do post for department else put
            //get the saved id from employee & department populate the employee_id & department_id inside employee_department object
            // then perform save.
            //also do the object check only if object of 'employee' and/or 'department' is available only then 
            //you will perform database operation on those repository

        });

        //QueryDeepPartialEntity<TEntity>
        // let posted_data_in_backend = await this.repository.save(repositoryModel.dataCollection);

        // let temp = await this.internalPost(this.repository, repositoryModel.dataCollection);


        // posted_data_in_backend.forEach((data)=>{
        //     responseRepositoryModel.dataCollection.push(data);
        // });
        

        return responseRepositoryModel;
    }


/*
function pluralize(entityName: string) {
    throw new Error("Function not implemented.");
}*/
}