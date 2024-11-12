
import Filter from "./Filter";
import { PageInfo } from "./PageInfo";
import { Transform } from 'class-transformer';

import { IsBoolean, IsDate, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { trim } from '../Utilities/cast.helper'
import { Injectable } from "@nestjs/common";
//import { toBoolean, toLowerCase, toNumber, trim, toDate } from '../u//helper/cast.helper';

@Injectable()
export default class RequestModelQuery{

    
    pageInfo: PageInfo;

    filter: Filter;

    constructor() {
        this.pageInfo = new PageInfo();
        this.filter = new Filter();
       
    }
}