import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeAppService from 'src/AppService/EmployeeAppService';
import Employee from 'src/Entities/Employee';
import { EmployeeFacade } from 'src/Facade/EmployeeFacade';
import { EmployeeRepository } from 'src/Repositories/EmployeeRepository';
import { RepositoryBase } from 'src/Repositories/RepositoryBase';
import { EmployeesController } from '../Controllers/Employees/employees.controller';
import { EmployeesService } from '../Services/employees.service';
import { ClientsModule,Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  exports:[
    TypeOrmModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeeFacade, EmployeeAppService, EmployeeRepository],
})
export class EmployeesModule { }