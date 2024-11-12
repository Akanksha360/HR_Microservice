import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Department from "src/Entities/Department";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModelQuery from 'src/Models/RequestModelQuery';

import { DataSource, Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";

@Injectable()
export class DepartmentRepository extends RepositoryBase<Department>{

   // public entityInstanceFunction: any;

    constructor(@InjectRepository(Department)private readonly usersRepository: Repository<Department>,
    ) {
        //@InjectRepository(Department)private readonly usersRepository: Repository<Department> to the base constructor
        super();
        super.repository = usersRepository;
        super.entityName = 'Department';
    }

}