import { DtoBase } from "src/Dtos/DtoBase";
import { PageInfo } from "./PageInfo";


export default class ResponseModel<TDto extends DtoBase>{

    dataCollection: Array<TDto>;

    pageInfo: PageInfo;

    constructor() {
        this.pageInfo = new PageInfo();
        this.dataCollection = new Array<TDto>();
    }
}