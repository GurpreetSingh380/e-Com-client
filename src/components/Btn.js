import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Btn(props) {
    const navigate = useNavigate();
  return (
      <button type="button" className="myBtn" onClick={()=>{navigate(props.route)}}>{props.title}</button>
  )
}
