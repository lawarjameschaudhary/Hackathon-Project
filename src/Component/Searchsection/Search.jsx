import React, { useState } from 'react'

const Search = (setResults) => {
  const [input, setInput] = useState('');

   const fetchData = async (value) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    console.log(data)
    const result = data.filter((user) => {
      return value && user && user.name && user.name.toLowerCase().includes(value)
    });
    console.log(result)
   }

   const handleChange = (e) => {
    const {value} = e.target
    setInput(value);
    fetchData(value);
   }


  return (
    <div className='flex justify-center mt-5'>
        <div className='flex relative'>
            <button onClick={fetchData(input)}>
              <img src="./src/assets/magnifier.png" alt="" className='w-7 absolute right-5 top-4' />
              </button>
        <input type="search" value={input}
        onChange={handleChange}
         name="search" id="" placeholder='What service you are searching for'  className='outline-none w-[400px]  md:w-[500px] px-7 md:px-10 py-7 rounded-full border-rato border-2 h-12 bg-slate-50'/>
        </div>
    </div>
  )
}

export default Search