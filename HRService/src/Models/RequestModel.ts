
import { DtoBase } from "src/Dtos/DtoBase";
import { PageInfo } from "./PageInfo";


export default class RequestModelQuery<TDto extends DtoBase>{

    dataCollection: Array<TDto>;



    constructor() {
        this.dataCollection = new Array<TDto>();
       
    }
}