import RequestBody from "./RequestBody"
import axios from "axios"
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Typography, Box, TextareaAutosize } from "@mui/material"
import { useEffect} from "react";

const textareaStyle = {
    width: '100%',
    padding: 10,
    background: `url(http://i.imgur.com/2cOaJ.png)`,
    backgroundAttachment: 'local',
    backgroundRepeat: 'no-repeat',
    paddingLeft: 35,
    paddingTop: 10,
    borderColor: '#ccc'
}

const btnstyle = {
  backgroundColor: "lightgreen",
  width: "100px",
  height: "40px",
  border: "none",
  fontSize: "22px",
  marginLeft: "120px"
}



export function Service(props) {
  let { getAccessTokenSilently } = useAuth0();
  let [data, setdata] = useState("");
  let [request, setRequest] = useState("YOUR RESPONSE");

  async function CallGet() {
    try 
    {
        let requestmodelquery = localStorage.getItem("RequestModelQuery")==null?null:JSON.parse(localStorage.getItem("RequestModelQuery"))
        console.log("requestmodelquery ",requestmodelquery)
        let token = await getAccessTokenSilently();
        await axios.get(`http://localhost:4000/HRService/${props.service}`, {
        headers: {
          authorization: `Bearer ${token}`,
          requestmodelquery: requestmodelquery
        }
      }).then((res) => {
        console.log(res.data)
        localStorage.setItem("GetItem", JSON.stringify(res.data.dataCollection));
        localStorage.removeItem("RequestModelQuery")
        setdata(localStorage.getItem("GetItem"))
        localStorage.removeItem("GetItem")
      })
    }
    catch (error) {
      console.log(error)
    }
  }



  async function CallPost() {
    console.log("poststststststst")
    try {
      
      if(localStorage.getItem("RequestModel")==null)
      {
        setdata("Please Provide RequestModel")
        throw ("Eoror")
      }
      else
      {
        
        let requestmodel = localStorage.getItem("RequestModel");
        let token =await getAccessTokenSilently();
        console.log(JSON.parse(requestmodel) ,"request query client side")
        await axios.post(`http://localhost:4000/HRService/${props.service}`, {}, {
        headers: {
          requestmodel: (JSON.parse(requestmodel)),
          authorization: `Bearer ${token}`
        }
        }).then((res) => {
          console.log("res ",res)
          localStorage.setItem("PostItem", JSON.stringify(res.data.message))
          localStorage.removeItem("RequestModel")
          setdata(localStorage.getItem("PostItem"))
          localStorage.removeItem("PostItem")
        })
      }

    }
    catch (error) {
      console.log(error)
    }
  }


  async function CallPut() {
   
    try {
      if(localStorage.getItem("RequestModel")==null||localStorage.getItem("id")==null)
      {
        setdata("Please provide RequestModel and Id");
      }
      else
      {
        let requestmodel = (localStorage.getItem("RequestModel"))
        let id=localStorage.getItem("id");
        let token = await getAccessTokenSilently()
        await axios.put(`http://localhost:4000/HRService/${props.service}/${id}`, {}, {
        headers: {
          requestmodel: (JSON.parse(requestmodel)),
          authorization: `Bearer ${token}`
        }
        }).then((res) => {
        console.log(res)
        localStorage.setItem("PutItem", JSON.stringify(res.data.message))
        localStorage.removeItem("RequestModel")
        setdata(localStorage.getItem("PutItem"))
        localStorage.removeItem("PutItem")
       })
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  async function CallDelete() {
    try {
      let id=localStorage.getItem("id");
      if(id==null)
      {
        setdata("Please Provide the ID");
      }
      else
      {
        id=parseInt(id)
        console.log(id)
        let token = await getAccessTokenSilently();
        await axios.delete(`http://localhost:4000/HRService/${props.service}/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
        }).then((res) => {
        console.log("response ",res)
        localStorage.setItem("DeleteItem", JSON.stringify(res.data.message))
        setdata(localStorage.getItem("DeleteItem"))
        localStorage.removeItem("DeleteItem")
        localStorage.removeItem("id")
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }



/*
  useEffect(() => {
    if (request.localeCompare("Get") == 0) {
        setRequest("YOUR Response")
        setdata(((localStorage.getItem("GetItem"))))
        console.log(data)
        localStorage.removeItem("GetItem")
    }
    if (request.localeCompare("Post") == 0) {
        setRequest("YOUR Response")
        setdata(((localStorage.getItem("PostItem"))))
        console.log(data)
        localStorage.removeItem("PostItem")
    }
    if (request.localeCompare("Put") == 0) {
        setRequest("YOUR Response")
        setdata(((localStorage.getItem("PutItem"))))
        console.log(data)
        localStorage.removeItem("PutItem")
    }
    if (request.localeCompare("Delete") == 0) {
        setRequest("YOUR Response")
        setdata(((localStorage.getItem("DeleteItem"))))
        console.log(data)
        localStorage.removeItem("DeleteItem")
    }
},[request])
*/



  return (
    <div className="w-[80%] m-auto bg-white-500">
      <br />
      <h1 style={{ marginLeft: "600px" }}>{props.service}</h1>
      <div className="gap-4 flex ">
      <button className="rounded-lg py-2 px-4 bg-lightblue-500 text-white" onClick={() => { CallGet(); }}>Get </button>
      <button className="rounded-lg p-2 bg-lightblue-500 text-white" onClick={() => { CallPost(); }}>Post</button>
      <button className="rounded-lg p-2 bg-lightblue-500 text-white" onClick={() => { CallPut(); }}>Put </button>
      <button className="rounded-lg p-2 bg-lightblue-500 text-white" onClick={() => { CallDelete(); }}>Delete </button>
      </div>
     
      <RequestBody />
      <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <TextareaAutosize
                className="border "
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                disabled="disabled"
                value={data}
            />
        </Box>
    </div>
  )
}