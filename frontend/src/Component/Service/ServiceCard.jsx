import React from 'react'
import { NavLink } from 'react-router-dom'

const ServiceCard = (props) => {

  return (
    <div className='bg-rato  w-fit border-2  shadow-md flex mt-10 flex-col rounded-md'>
        <div>
          <img src={props.data.imageUrl} alt=""  className='w-full'/>
        </div>
        <div className='py-9 px-9'>
        <h1>Provider : {props.data.offeredBy.username}</h1>
        <h1>Servicename : {props.data.serviceName}</h1>
        <h1>Description : {props.data.description}</h1>
        <button className='bg-green-500 p-12'><NavLink className="">Hire me</NavLink></button>
        </div>
    </div>
  )
}

export default ServiceCard