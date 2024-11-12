

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Department from "./Department";
import Employee from "./Employee";
import { EntityBase } from "./EntityBase";


@Entity("employee_departments")
export default class EmployeeDepartment extends EntityBase{
    constructor(){
        super();
    }

    @Column({ name:'employee_id' })//in table we refer this...........
    public employee_id:number;//in code we refer this...................

    @Column({ name:'department_id' })
    public department_id:number;


    @ManyToOne((type)=>Department,department=>department.id,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'department_id'})
    public department:Department;


    @ManyToOne((type)=>Employee,(employee)=>employee.id,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'employee_id'})
    public employee:Employee;

    //sir has asked not use cacade here...........

}

