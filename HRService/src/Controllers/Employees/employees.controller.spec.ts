import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from 'src/Services/employees.service';
import { EmployeesController } from './employees.controller';
describe('EmployeesController', () => {
  let employeeController: EmployeesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    employeeController = app.get<EmployeesController>(EmployeesController);
  });

  describe('root', () => {
    it('should return "Hello World! From Empoyees" ', () => {
      const temp_var = 'Hello World From Empoyees';
      expect(employeeController.getEmployees()).toBe(temp_var);
      //
    });
  });
});
