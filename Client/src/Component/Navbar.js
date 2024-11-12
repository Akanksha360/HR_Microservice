import { Service } from "../Component/Service"
import { BrowserRoutes, Route } from 'react'
import { useState } from 'react'
import Home from './Home'

let menu = {
  color: "white",
  float: "left",
  paddding: "5px",
  border: "none",
}




export default function Navbar(props) {
  let [service, setService] = useState();
  let [home, setHome] = useState(true)
  return (

    <div className="pos-f-t">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <h4 className="text-white">HRSERVICE</h4>
          <span className="text-muted"></span>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <button className="rounded-lg bg-lightblue text-white" onClick={() => setHome(true)}>Home</button>
        <button className="rounded-lg bg-lightblue text-white" onClick={() => { setService("EMPLOYEE"); setHome(false) }}>EMPLOYEE</button>
        <button className="rounded-lg bg-lightblue text-white" onClick={() => { setService("DEPARTMENT"); setHome(false) }}>DEPARTMENT</button>
        <button className="rounded-lg bg-lightblue text-white" onClick={() => { setService("EMPLOYEEDEPARTMENT"); setHome(false) }}>EMPLOYEEDEPARTMENT</button>
        <button className="rounded-lg bg-lightblue text-white" onClick={props.logout}>Logout</button>
      </nav>
      {home ? <Home /> : <Service service={service} />}
    </div>

  )
}