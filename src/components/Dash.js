import React from 'react'
import Btn from './Btn'
export default function Dash(props) {
  return (
    <>
      <div className="text-center" style={{minHeight: '83vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-3 st1">
          <div className='dashHead'>{props.title}</div>
          <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            {props.child.map((object)=>{
              return <Btn title={object.title} route={object.route}/>
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
