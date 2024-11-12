import { Injectable } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { toNumber } from "../Utilities/cast.helper";

@Injectable()
export class PageInfo{

    constructor(){
        this.page_number=1;
        this.page_size=5;
        this.total_records=0;
    }

    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber()
    @IsOptional()
    page_number:number;

    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber()
    @IsOptional()
    page_size:number;

    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber()
    @IsOptional()
    total_records:number;

}