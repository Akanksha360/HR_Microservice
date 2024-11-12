import React from 'react'


const Button = (props) => {
  return (
    <div>
    <button style={{ float:"left", margin:"5px" }}>{props.name}</button>
    </div>
  )
}

export default Button