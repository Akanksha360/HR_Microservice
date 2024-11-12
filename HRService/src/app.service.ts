import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {

  public topics=[];
  constructor() { 
       
    
  }

  getHello(): string {
    return 'Hello World!';
  }

 

}
