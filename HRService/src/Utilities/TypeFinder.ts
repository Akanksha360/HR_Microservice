import { EntityBase } from "src/Entities/EntityBase";

export default class Typefinder<TEntity extends EntityBase> {
    private TName : string;
    constructor(x : TEntity&Function) {
        this.TName = x.name;
    }

    public GetTypeName():string{
        return this.TName;
    }
}

