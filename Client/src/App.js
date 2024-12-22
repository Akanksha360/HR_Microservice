import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import Navbar from './Component/Navbar';
import styled from 'styled-components'
import io from 'socket.io-client';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
const socket = io.connect('http://localhost:4000');

const Container = styled.div`
  display: flex;                
  flex-direction: column;
  width: 100%;
  background-color: #0a0e11;
  height: 100vh;
`;



const btnstyle = {
  backgroundColor: "lightgreen",
  width: "100px",
  height: "40px",
  border: "none",
  fontSize: "22px",
  marginLeft: "120px"
}


const Header = styled.div`
  color: white;
  width: 100%;
  font-weight: bold;
  background-color: #56bca6;
  padding: 50px 50px 140px;
  font-size: 24px;
`;
const CardView = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 40px;
  flex-wrap: wrap;
`;

const Instructions = styled.div`
  padding: 20px;
  font-size: 16px;

  ol {
    margin: 40px 0;
  }

  li {
    margin: 15px 0;
  }
`;

const Heading = styled.span`
  font-size: 24px;
  color: #525252;
`;

const QRCode = styled.img`
  width: 264px;
  height: 264px;
  background-color: white;
`;
export default function App() {

  const { loginWithPopup, logout, isAuthenticated, } = useAuth0();
  return (
    <>
      {isAuthenticated ?
        <div>
          <Navbar logout={logout} />
        </div> :
        <Container>
          <Header>HR-Service</Header>
          <CardView>
            <Instructions>
              <Heading></Heading>
              <ol>
                <li className=''>You need to Signin using your Google Account.</li>
                <li>You can anytime logout</li>
                <li>Click on Signin button to continue</li>
              </ol>
              <button style={btnstyle} onClick={loginWithPopup}>Login</button>
            </Instructions>
          </CardView>
        </Container>
      }
    </>
  )
}


