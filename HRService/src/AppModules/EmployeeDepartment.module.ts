import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeDepartmentService from 'src/AppService/EmployeeDepartmentService';
import EmployeeDepartment from 'src/Entities/EmployeeDepartment';
import { EmployeeDepartmentFacade } from 'src/Facade/EmployeeDepartmentFacade';
import { DepartmentRepository } from 'src/Repositories/DepartmentRepository';
import { EmployeeDepartmentRepository } from 'src/Repositories/EmployeeDepartmentRepository';
import { EmployeeRepository } from 'src/Repositories/EmployeeRepository';
import { RepositoryBase } from 'src/Repositories/RepositoryBase';
import { EmployeeDepartmentController } from '../Controllers/Employees/EmployeeDepartment.controller';
//import { EmployeeDepartmentService } from '../Services/EmployeeDepartment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeDepartment]),
  ],
  exports:[
    TypeOrmModule
  ],
  controllers: [EmployeeDepartmentController],
  providers: [EmployeeDepartmentFacade, EmployeeDepartmentService, EmployeeDepartmentRepository],
})
export class EmployeeDepartmentModule { }