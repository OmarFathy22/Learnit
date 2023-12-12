import React from "react";
import Loading from "../Comp/Courses/Loading";
import { data } from "../../Data";
import CategoriesMobile from "../Comp/Courses/Categoriesmobile";
import CategoriesWeb from "../Comp/Courses/Categories";

const MainContent = ({MainCourses , setMainCourses}) => {
  return (
    <div className="mt-[50px] sm:mt-[95px] flex  mx-auto  overflow-hidden ">
      <div className="flex flex-col overflow-hidden px-2">
        {/* <div className=" mx-10 max-600:mt-7 mb-2   max-900:hidden ">
          <CategoriesWeb curr={curr} setCurr={setCurr} />
        </div>
        <div className="mx-10 mt-[101px] mb-2  overflow-auto min-900:hidden ">
          <CategoriesMobile curr={curr} setCurr={setCurr} />
        </div> */}
        <div className="my-[50px] max-600:my-[80px]">
          <Loading MainCourses={MainCourses} setMainCourses={setMainCourses}/>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
