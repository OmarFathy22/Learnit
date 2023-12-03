import React from "react";

import { categories } from "../../../Data";

const Categories = ({ curr, setCurr }) => {
  return (
    <ul className="flex pb-2 px-3">
      {categories.map((category, index) => (
        <li
          key={index}
          className={` mr-2 !w-[220px]  flex justify-center items-center px-3 text-center cursor-pointer border-[2px] whitespace-nowrap border-gray-300 rounded-md ${
            index === curr ? "border-blue-400 bg-blue-300" : ""
          }`}
          onClick={() => setCurr(index)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
