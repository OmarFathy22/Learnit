import React from 'react';
import { categories } from '../../../Data';
const Categories = ({curr , setCurr}) => {
  return (
      <ul className='flex gap-2 my-5  items-center'>
        {categories.map((category , index) => (
           <li
            onClick={() => setCurr(index)}
           key={index} className={`py-1 sm:text-[12px] px-2 cursor-pointer border-[1px] whitespace-nowrap border-gray-300 rounded-md ${index === curr ? "border-blue-400 bg-blue-100":""}`}>{category}</li>
        ))}
      </ul>
  );
}

export default Categories;
