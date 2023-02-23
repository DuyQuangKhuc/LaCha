import React from 'react'
import Delivery from '../img/delivery.png'

const MainContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      <div className='py-2 flex-1 flex flex-col items-start md:items-center justify-center'>
        <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
          <p className='text-base text-green-500 font-semibold'>Delivery</p>
          <div className='w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img src={Delivery} className="w-full h-full object-contain" alt="delivery"/>
          </div>
        </div>

        <p className='text-[2.5rem] font-bold tracking-wide text-headingColor'> 
          The Delivery in {""}
          <span className='text-green-600 text-[3rem]'> Your Apartment</span>
        </p>

      </div>
      <div className='p-4 flex-1'></div>
    </div>
  )
}

export default MainContainer