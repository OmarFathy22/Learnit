import React from 'react';
import Loading from '../Comp/Courses/Loading'
import {BsCheck2Circle} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
import {data2} from "../../Data"

const MainContent = () => {
  return(
  <div className='w-full mx-5 sm:mt-[20px]'>
      <div className='w-full mt-[100px] gap-5  flex justify-between '>
          <div className='p-2 w-1/2 flex items-center border-[1px] border-gray-300 rounded-md gap-3'>
            <h1 className='text-[40px]  text-[#8b8bf1] bg-[#d8edf0a5] rounded-full p-1'><BiTimeFive/></h1>
            <div>
              <h1 className='font-bold'>In Progress</h1>
              <h1>2 Courses</h1>
            </div>
          </div>
          <div className='p-2 w-1/2 flex items-center border-[1px] border-gray-300 rounded-md gap-3'> 
            <h1 className='text-[40px] text-[#297c29] bg-[#acdfac4d] rounded-full p-1'><BsCheck2Circle/></h1>
            <div>
              <h1 className='font-bold'>Completed </h1>
              <h1>0 Courses</h1>
            </div>
          </div>
    
    
    
          
      </div>
          <div className='mt-10  justify-start'>
            <Loading data={data2}/>
          </div>
  </div>
  )




};

export default MainContent;