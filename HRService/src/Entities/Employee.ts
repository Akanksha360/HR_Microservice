import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,ManyToOne } from "typeorm"
import EmployeeDepartment from "./EmployeeDepartment";

import { EntityBase } from "./EntityBase";


@Entity("employees")
export default class Employee extends EntityBase{
    constructor(){
        super();
        this.name='';
        this.age=0;
    }
    @Column({ name:'age' })
    age:number;

    @Column({ name:'emp_name' })
    public name:string;

    
    @OneToMany(()=>EmployeeDepartment,
        (employeedepartment)=>employeedepartment.employee,{cascade:true})
    public employeesdepartments:Array<EmployeeDepartment>;

}



