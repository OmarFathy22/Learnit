import React from "react";
import Loading from "../Comp/Courses/Loading";
import { data } from "../../Data";
import Categories from "../Comp/Courses/Categories";
const MainContent = () => {
  const [curr , setCurr] = React.useState(0)
  return (
    <div className="mt-[85px] sm:mt-[95px] flex  mx-auto  overflow-hidden ">
      <div className="flex flex-col overflow-hidden px-2">
        <div className="overflow-auto ">
          <Categories curr={curr}  setCurr={setCurr} />
        </div>
        <div className="my-[20px]">
          <Loading data={data} curr = {curr}/>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
