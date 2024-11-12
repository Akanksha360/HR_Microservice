

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import EmployeeDepartment from "./EmployeeDepartment";

import { EntityBase } from "./EntityBase";


@Entity("departments")
export default class Department extends EntityBase{
   

    constructor(){
        super();
        this.department_name='';
        
    }

    @Column({name:"department_name"})
    department_name:string;

    @OneToMany(()=>EmployeeDepartment,
    (employeedepartment)=>employeedepartment.employee,{cascade:true})
        public employeesdepartments:Array<EmployeeDepartment>;

}

