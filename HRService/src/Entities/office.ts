import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity('Office')
export default class office {
    constructor(){

    }

    @PrimaryGeneratedColumn()
    office_id:number

}
