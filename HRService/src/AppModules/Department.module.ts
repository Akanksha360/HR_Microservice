import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DepartmentService from 'src/AppService/DepartmentService';
import Department from 'src/Entities/Department';
import { DepartmentFacade } from 'src/Facade/DepartmentFacade';
import { DepartmentRepository } from 'src/Repositories/DepartmentRepository';
import { RepositoryBase } from 'src/Repositories/RepositoryBase';
import { DepartmentController } from '../Controllers/Employees/Department.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
  ],
  exports:[
    TypeOrmModule
  ],
  controllers: [DepartmentController],
  providers: [DepartmentFacade, DepartmentService, DepartmentRepository],
})
export class DepartmentModule { }