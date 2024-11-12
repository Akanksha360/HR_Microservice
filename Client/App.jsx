import React from 'react'
// import Button from './Button';
import RequestBody from './RequestBody';
import Response from './Response';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:8000');

async function CallGet() {
  const response = await axios.get("http://localhost:8000/HRService/EMPLOYEE");
  console.log(response);
}
async function CallPost() {
  var bodyJSON = JSON.parse(localStorage.getItem("Body"));
  console.log(body,"post client side");

  const response = await axios.post("http://localhost:8000/HRService/EMPLOYEE", {
    body: {
      data: bodyJSON,
    },
  });
  console.log(response);
}
async function CallPut() {
  var bodyJSON = JSON.parse(localStorage.getItem("Body"));
  console.log(body);
  const response = await axios.put("http://localhost:8000/HRService/EMPLOYEE", {
    body: {
      data: bodyJSON,
    },
  });
  console.log(response);
}
async function CallDelete() {
  const response = await axios.delete("http://localhost:8000/HRService/EMPLOYEE", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
const App = () => {
  return (
    <div>
      <button onClick={CallGet}>Get</button>
      <button onClick={CallPost}>post</button>
      <button onClick={CallPut}>Put</button>
      <button onClick={CallDelete}>delete</button>
      <RequestBody />
      <Response />
    </div>
  )
}

export default App;