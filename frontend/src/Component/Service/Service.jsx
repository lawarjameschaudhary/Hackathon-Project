import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard';
import { useServices } from '../../utils';

const Service = () => {
    
    const[state, setState] = useState([]);
    const toggleButton = () => {
        setState(!state)
    }
    const { services, error, loading } = useServices();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 

  return (
  <div>
     <div className='bg-rato relative shadow '>
     <div className='flex justify-between px-14 py-5 font-ajhai-arko font-semibold text-xl'>
        <div>
            <button>Services</button>
        </div>
        <div>
            <button onClick={toggleButton}>Location</button>
        </div>
    </div>
    <div>
        {state && (
            <div>
                <div></div>
            </div>
        )}
    </div>
    <div className="serivces absolute top-2*0 h-screen px-14 py-10 flex flex-col gap-10 font-ajhai-arko text-xl bg-rato">
        <div className='border-b-4 hover:border-white'>Plumber</div>
        <div className='border-b-4 hover:border-white'>Electircian</div>
        <div className='border-b-4 hover:border-white'>Doctor</div>
        <div className='border-b-4 hover:border-white'>Tutor</div>
    </div>
   </div>
   <div className=' mt-6 ml-[294px]'>
      <div className='grid grid-cols-3'>
        {services.map((item, index) => {
            return <ServiceCard data={item} key={index} />
        })}
      </div>
    </div>
  </div>
  )
}

export default Service