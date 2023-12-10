import React from 'react'
import loadGif from '../images/load-gif.gif'

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <img src={loadGif} alt="Loading..."/>
    </div>
  )
}
