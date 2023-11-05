import React from 'react';
import Loading from '../Comp/Courses/Loading'
import {data} from "../../Data"
const MainContent = () => {
  return(
    <div>
      <div className='mt-[100px] flex  mx-auto  '>
        <Loading data={data} />
      </div>
    </div>
  )




};

export default MainContent;