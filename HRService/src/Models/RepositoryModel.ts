
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "./PageInfo";


export default class RepositoryModel<TEntity extends EntityBase>{

    dataCollection: Array<TEntity>;

    pageInfo: PageInfo;

    constructor() {
        this.pageInfo = new PageInfo();
        this.dataCollection = new Array<TEntity>();
    }
}