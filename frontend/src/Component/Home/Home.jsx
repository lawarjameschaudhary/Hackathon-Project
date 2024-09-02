import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import ProductSlider from '../ProductSlider/ProductSlider';

function Home() {

  return (
    <div className='' >
    <div className='px-28'>
    <ProductSlider />
    </div>
      <div className=''>
      <Service />
      </div>
  </div>
  );
}

export default Home;
