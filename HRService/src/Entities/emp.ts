import {Entity,Column,OneToOne,JoinColumn,PrimaryGeneratedColumn} from 'typeorm'
import office from '../Entities/office'

@Entity('emp')
export default class emp
{
    constructor()
    {

    }

    @PrimaryGeneratedColumn()
    emp_id:number

    @Column()
    empname:string

    @Column()
    office_id:number


    @OneToOne(type=>office,office=>office.office_id)
    @JoinColumn({name:'office_id'})
    office:office
}