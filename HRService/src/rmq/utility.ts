import Exchange from "./Config-dev";
import ResponseModel from '../ReponseModel';
const amqp=require('amqplib/callback_api')

interface QueueURLMapValue {
  queueName: string;
  OnSuccessTopicsToPush: string[];
  OnFailureTopicsToPush: string[];
}

export class Utility {
  private static instance: Utility;//Prototype
  private queueURLMap: { [id: string]: QueueURLMapValue } = {};
  private channel;
  private rabbitmqURL: string = `amqp://localhost`;
  private topicNames: string[] = [];

  private constructor() {
    this.init_utility();//creating all the exchanges and bindQueues as constructor executes
  }

  public static getInstance(): Utility {
    if (!Utility.instance) {
      Utility.instance = new Utility();
    }
    return Utility.instance;
  }

  

  public async init_utility() {
    try {
      console.log("Connecting to rabbitmq " + this.rabbitmqURL);
      amqp.connect(this.rabbitmqURL, (err, connection) => {
        if (err) {
          console.log("from connection", err);
        }
        connection?.createChannel((err, channel) => {
          if (err) {
            console.log("from connection", err);
          }
          this.channel = channel;
          
          //Reading All the Topics
          const topics = Exchange.Topics;
          for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];

            let topicName = topic.TopicName;
            this.topicNames.push(topicName);
            //Asserting the exchange
            channel.assertExchange(topicName, "fanout", {
              durable: true,
            });

            let subscribers = topic.Subscribers;
            for (let j = 0; j < subscribers.length; j++) {
              let subscriber = subscribers[j];
              let queueName = subscriber.QueueName;
              //Asserting the Queue
              channel.assertQueue(queueName, {
                exclusive: false,
              });
              
              //Binding the Queue with the TopicName in Exchange
              channel.bindQueue(queueName, topicName, ""); //(EMPLOYYEE_ADD, EMPLOYEE_ADD-HR_SERVICE)
              let queueURLMapValue = {
                queueName: queueName,
                OnSuccessTopicsToPush: subscriber.OnSuccessTopicsToPush,
                OnFailureTopicsToPush: subscriber.OnFailureTopicsToPush,

              };

              this.queueURLMap[queueName] = queueURLMapValue;
           
            }
          }
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  public PublicMessageToTopic(topicName: string,message: any): ResponseModel {//boolean////camel case
  
   // console.log("message in publcih",message)

    const data = Buffer.from(JSON.stringify(message));

    if (this.topicNames.includes(topicName)) {
      this.channel.publish(topicName, "", data);
      var response = new ResponseModel(
        200,
        "SUCCESS",
        "POST",
        `Successfully published into Topic Name : ${topicName} `,
        {}
      );
    } else {
      var response = new ResponseModel(
        400,
        "FAILED",
        "POST",
        `Unalble to publish to Topic Name : ${topicName} `,
        {}
      );
    }
    return response;
  }

  //Listening to Services
  public async listenToService(topicName:string, serviceName:string, callBack:any) {
    try {
      const queueURLMapValue = this.queueURLMap[topicName + "-" + serviceName];
      const queueName = queueURLMapValue.queueName;
      this.channel.consume(
        queueName,
        (msg) => {
          if (msg.content) {
            let message = JSON.parse(msg.content);
            callBack({
              message,
              OnSuccessTopicsToPush: queueURLMapValue.OnSuccessTopicsToPush,
              OnFailureTopicsToPush: queueURLMapValue.OnFailureTopicsToPush,
              topicName
            });
          }
        },
        { noAck: true }
      );
    } catch (e) {
      //in case of error listen again after 5 seconds........//set counter to prevent infinite loop...then counter=0
      setTimeout(() => {
        this.listenToService(topicName, serviceName, callBack);
      }, 5000);
    }
  }

  public listenToServices(serviceName, callback) {
    let topics = Exchange.Topics;
    for (let i = 0; i < topics.length; i++) {
      let topic = topics[i];
      let topicName = topic.TopicName;
      let subscribers = topic.Subscribers;
      for (let j = 0; j < subscribers.length; j++) {
        let subscriber = subscribers[j];
        let vServiceName = subscriber.Service;
        if (vServiceName === serviceName) {
          this.listenToService(topicName, serviceName, callback);
        }
      }
    }
  }
}
