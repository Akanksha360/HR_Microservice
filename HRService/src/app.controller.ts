import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';

import {  EventPattern, MessagePattern ,ClientProxy} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {
    console.log('test');
  }

  
  @Get()
  getHello(): string {
   // let x = this.client.send('greeting1', 'Progressive Coder');
    //this.client.emit<any>('message_printed', MessagePattern('hello world'));
   // return this.appService.getHello();
return
   


  }
  

  }
