import React from 'react';
import './/Loader.css'
import loader from '../../utils/img/Spinner-1s-200px.svg'

const Loader = () => {
  return (
    <div className='container'>
      <div className='loader d-flex justify-content-center align-items-center'>
        <img src = {loader} alt = "" />
      </div>
    </div>
  )
}

export default Loader
