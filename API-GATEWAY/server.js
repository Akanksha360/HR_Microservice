const express=require('express')
const app = express();
const { Utility } =require ("./rmq/utility");
var utility = Utility.getInstance();
var cors = require("cors");
const axios  =require("axios").default;
const port = 8001;
app.use(express.json())
app.use(cors());
const RequestModel =require('../API-GATEWAY/Models/RequestModel')
const  RequestQueryModel =require('../API-GATEWAY/Models/RequestQueryModel.js');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const authentication=require('./Middleware/Authentication');
const authorizartion=require('./Middleware/Authorization');

let socketArray=[]


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});


io.on('connection', (socket) => {
  //console.log("User connected: ", socket.id);
  socketArray.push(socket)
  
    socket.broadcast.emit("hello")
 
  socket.on('disconnect', () => {
    //console.log("User got disconnected!");
  })

})

//Evaluating the Corresponding module_name sent by the get request
function evaluate_service_routes(service_name, module_name)
{
 // console.log("i am here",service_name,module_name)
    let response=''
    if (service_name.localeCompare("HRService") == 0) {
      switch (module_name) {
        case 'EMPLOYEE': response = 'http://localhost:8000/' + 'EMPLOYEE';//call Employee Module in HRService
          break;
        case 'DEPARTMENT': response = 'http://localhost:8000/' + 'DEPARTMENT';//call Department Module in HRService
          break;
        case 'EMPLOYEEDEPARTMENT': response = 'http://localhost:8000/' + 'EMPLOYEEDEPARTMENT';//call EmployeeDepartment Module in HRService
          break;
        default: return "No Module found";
      }
    }
    else {
      response = "No Service Found";
    }
    return response;
}

app.get('/test',(req,res)=>{
  //console.log("req",req)
  res.send("akanksha")
})

///Get All Request
app.get("/:service_name/:module_name",authentication.authenticate, authorizartion.authorize, async (req, res) => {
  try {
      let service_name = req.params.service_name;
      let module_name = req.params.module_name;
      let requestModelQuery_temp;
      if(!!req.headers['requestmodelquery'])
      {
         requestModelQuery_temp=JSON.parse(req.headers['requestmodelquery']);
      }
      else{
        requestModelQuery_temp=new RequestQueryModel();
      }
      let url = evaluate_service_routes(service_name, module_name)
      await axios.get(url,{
        headers:{
          requestmodelquery:JSON.stringify(requestModelQuery_temp)
      }}).then((response)=>{
        console.log("response",response.data)
        res.send(response.data)
      })
    
      
  }
  catch (e) {
      console.log("error ")
  }
});


///Post Request
//{"dataCollection":[{"name":"shahrukh khan","age":50}]}
app.post("/:service_name/:module_name",authentication.authenticate, authorizartion.authorize, (req, res) => {
    const requestModel=JSON.parse(JSON.stringify(req.headers))['requestmodel'];
   console.log(JSON.parse(requestModel),"post 400000000 port");
    const topicName = req.params.module_name + "_ADD";//EMPLOYEE_ADD
    const response = utility.PublicMessageToTopic(topicName, JSON.parse(requestModel));
    res.json(response);
});


//Put Request
//{"dataCollection":[{"name":"shahrukh khan","age":50}]}
//{"dataCollection":[{"department_name":"History"}]}
//{"dataCollection":[{"department_id":8,"employee_id":59}]}
//RequestQueryModel
//{"filter": {"conditions": [{"field_name": "id","field_value": 6,"operator": "="}]},"pageInfo": {"offset": 2,"limit": 5}}
//{"filter": {"conditions": [{"field_name": "id","field_value": 50,"operator_type": "=","condition_operator":"and"},{"field_name": "name","field_value":"Akshara","operator_type": "=","condition_operator":"and"}]},"pageInfo": {"offset": 2,"limit": 5}}
app.put("/:service_name/:module_name/:id",authentication.authenticate, authorizartion.authorize, (req, res) => {
    const requestModel=JSON.parse(JSON.stringify(req.headers))['requestmodel'];
    const topicName = req.params.module_name + "_UPDATE"; 
    const body = {
        id:parseInt(req.params.id),
        requestModel: JSON.parse(requestModel),
    }
    //Publishing (method in Utility.ts)
    const response = utility.PublicMessageToTopic(topicName, body);
    res.json(response);
});


//Delete Request
app.delete("/:service_name/:module_name/:id",authentication.authenticate, authorizartion.authorize, (req, res) => {
let topicName = req.params.module_name + "_DELETE"; 
//Publishing (method in Utility.ts)
//console.log(req.params.id)
const response = utility.PublicMessageToTopic(topicName,req.params.id);
res.json(response);
});



///Server //it is also listening to the Utility(Broker) 
//method listenToServices(which listens all the services to which API-Gateway is subscriber) 
server.listen(port, () => {
    console.log("Server Runnig on : ", port);
    utility.listenToServices("API_GATEWAY_SERVICE", (result) => {
        const { message } = result;
        console.log(result);
    });
});



