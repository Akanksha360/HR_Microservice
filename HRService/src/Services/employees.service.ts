import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  getEmployees(): string {
    return 'Hello World From Empoyees';
  }

  
  get(id: number): string {
   // let id2 = id;
    return 'Hello World From Empoyees by Id' + id.toString();
  }
}
