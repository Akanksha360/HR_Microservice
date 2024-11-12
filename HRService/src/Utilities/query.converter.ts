import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import RequestModelQuery from 'src/Models/RequestModelQuery';

@Injectable()
export class QueryConverter implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    // Make sure to only run your logic on queries
    if (type === 'query') return this.transformQuery(value);

    return value;
  }

  transformQuery(query: any):RequestModelQuery {
    if (typeof query !== 'object' || !query) return query;

    const { query1 } = query;

    console.log(query);
    let q1 = JSON.parse(query);

    //if (sort) query.sort = convertForTypeOrm(sort);

    return q1;
  }
}