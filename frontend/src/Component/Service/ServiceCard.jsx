import React from 'react'

const ServiceCard = (props) => {

  return (
<div className='bg-rato py-6 grid-cols-2 mr-[20px] px-4 md:py-10 md:px-7 w-full max-w-md  border-2 shadow-md  rounded-md mt-10'>
    <h1 className='text-lg md:text-xl '>Provider: {props.data.offeredBy.username}</h1>
    <h1 className='text-lg md:text-xl '>Service Name: {props.data.serviceName}</h1>
    <h1 className='text-lg md:text-xl '>Description: {props.data.description}</h1>
</div>

  )
}

export default ServiceCard