import { DtoBase } from "src/Dtos/DtoBase";
import Condition from "./Condition";
import { PageInfo } from "./PageInfo";
import { IsBoolean, IsDate, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { Injectable } from "@nestjs/common";

@Injectable()
export default class Filter{

    
    conditions: Array<Condition>;

    constructor() {
        this.conditions = new Array<Condition>();
    }
}