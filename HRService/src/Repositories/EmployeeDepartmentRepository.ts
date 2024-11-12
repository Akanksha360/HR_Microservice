import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Department from "src/Entities/Department";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModelQuery from 'src/Models/RequestModelQuery';
import EmployeeDepartment from "src/Entities/EmployeeDepartment";

import { DataSource, Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";

@Injectable()
export class EmployeeDepartmentRepository extends RepositoryBase<EmployeeDepartment>{

   // public entityInstanceFunction: any;

    constructor(@InjectRepository(EmployeeDepartment)private readonly usersRepository: Repository<EmployeeDepartment>,
    ) {
        //@InjectRepository(Department)private readonly usersRepository: Repository<Department> to the base constructor
        super();
        super.repository = usersRepository;
        super.entityName = 'EmployeeDepartment';
    }

}