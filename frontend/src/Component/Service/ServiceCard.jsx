import React from 'react'

const ServiceCard = (props) => {

  return (
<<<<<<< HEAD
<div className='bg-rato py-6 grid-cols-2 mr-[20px] px-4 md:py-10 md:px-7 w-full max-w-md  border-2 shadow-md  rounded-md mt-10'>
    <h1 className='text-lg md:text-xl '>Provider: {props.data.offeredBy.username}</h1>
    <h1 className='text-lg md:text-xl '>Service Name: {props.data.serviceName}</h1>
    <h1 className='text-lg md:text-xl '>Description: {props.data.description}</h1>
</div>

=======
    <div className='bg-rato py-10 px-7 w-fit border-2  shadow-md flex mt-10 flex-col rounded-md'>
        <div>
          <img src={props.data.imageUrl} alt="" />
        </div>
        <div>
        <h1>Provider : {props.data.offeredBy.username}</h1>
        <h1>Servicename : {props.data.serviceName}</h1>
        <h1>Description : {props.data.description}</h1>
        </div>
    </div>
>>>>>>> ce82535eef1264d918f6238c193b97e5809d8b62
  )
}

export default ServiceCard