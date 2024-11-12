import { DtoBase } from "src/Dtos/DtoBase";
import { PageInfo } from "./PageInfo";
import { IsBoolean, IsDate, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { Injectable } from "@nestjs/common";

@Injectable()
export default class Condition{

    public field_name:string; 
    public field_value:any; 
    public operator_type:string; 
    public condition_operator:string;
    
   

    constructor() {
        this.field_name = '';
        this.field_value = '';
        this.operator_type = '=';
       this.condition_operator='';
    }
}