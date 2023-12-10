import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Pnf(props) {
  let handleOnClick = () => {
    if (props.purpose==='default') navigate(-1);
    else navigate(`/${props.purpose}`);
  }
  let navigate = useNavigate();
  return (
    <div className='pnf'>
      <div className='four'>404</div>
      <div>Oops! Page Not Found</div>
      <button type="button" class="btn btn-secondary"  onClick={handleOnClick}>{props.show}</button> 
    </div>
  )
}
