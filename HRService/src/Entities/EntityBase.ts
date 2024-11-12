import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EntityBase{

    @PrimaryGeneratedColumn({name:'id'})
    public id: number;

    constructor(){
        this.id=0;
    }
};