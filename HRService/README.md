PLEASE READ THIS FOR COMPLETE UNDERSTANDING OF THE PROJECT

THE FLOW STARTS WITH APP MODULE OF NEST JS

1.YOU CAN DEFINE YOUR OWN MODULE, AS WE HAVE DEFINED 'EMPLOYEE MODULE' TO DEFINE ITS OWN DEPENDENCIES.

2. REM: ALL DEPENDENCIES DEFINED IN THE CONSTRUCTOR HAS TO BE PROPERLY RESOLVABLE TILL THEN YOUR OBJECT CREATION THROUGH CONSTRUCTOR WILL NOT HAPPEN.
 'EMPLOYEE CONTROLLER' --> 'EMPLOYEE FACADE' --> 'EMPLOYEE APPLICATION SERVICE' --> 'EMPLOYEE REPOSITORY'

/*
 @Module({
    controllers: [EmployeesController],
    providers: [ EmployeeFacade, EmployeeAppService, EmployeeRepository],
  })
*/

3. FUNCTION DELEGATES: USE THEM TO PASS FUNCTION REFERENCES TO NEXT LEVEL CALLING OBJECT
  EXAMPLE: AS WE HAVE USED 'CreateEntityInstance' VIA 'public entityInstanceFunction: any;' SITTING INSIDE REPOSITORY BASE.


4. MAPPINGS: MAPPINGS ARE WELL DEFINED INSIDE APP SERVICE VIA DELEGATES ASSIGNED VIA BASE ABSTRACT METHOD

    abstract CreateEntityInstance():TEntity;  &   abstract CreateDtoInstance():TEntity; inside ApplicationServiceBase

  /*
  ConvertDtoToEntity(dto: EmployeeDto): Employee {
       let employee_entity = new Employee();
       employee_entity.id = dto.id;
       employee_entity.age = dto.age;
       employee_entity.name = dto.name;

       return employee_entity;
       

    }
    ConvertEntityToDto(entity: Employee): EmployeeDto {
        let employee_dto = new EmployeeDto();
        employee_dto.id = entity.id;
        employee_dto.age = entity.age;
        employee_dto.name = entity.name;
 
        return employee_dto;
    }
  */

5. DATABASE: ONCE YOU GET DATA FROM DATABASE IT WILL BE IN THE FORM OF ENTITIES, SO YOU NEED TO USE THE MAPPERS TO CONVERT THEM TO RESPECTIVE DTO'S .