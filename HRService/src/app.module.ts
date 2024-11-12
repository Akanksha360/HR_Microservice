import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './AppModules/Employees.module';
import FacadeBase from './Facade/FacadeBase';
import { RepositoryBase } from './Repositories/RepositoryBase';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from './Entities/Employee';
import Department from './Entities/Department';
import EmployeeDepartment from './Entities/EmployeeDepartment';
import { DepartmentModule } from './AppModules/Department.module';
import { EmployeeDepartmentModule } from './AppModules/EmployeeDepartment.module';
import office from './Entities/office';
import emp from './Entities/emp'
@Module({
  imports: [
    EmployeesModule,DepartmentModule,EmployeeDepartmentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'microservice12345',
      password: 'qwerty12345',
      database: 'microservice_database',
      entities: [Employee, Department, EmployeeDepartment,emp,office],
      synchronize: true,
      logging:true
    })
  ],
  controllers: [AppController,],
  providers: [AppService, RepositoryBase, FacadeBase],

  
})
export class AppModule {}

/*

|---------------------------|   |---------------------------|   |---------------------------| 
|           MODULE          |   |           CONTROLLER      |   |-------PROVIDER------------|  
|---------------------------|   |---------------------------|   |---------------------------|   




main.ts

  |

AppModule

  |

 (all modules defined as per hierarchy) 

*/