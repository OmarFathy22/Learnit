import React from "react";
import Loading from "../Comp/Courses/Loading";
import { data } from "../../Data";
import CategoriesMobile from "../Comp/Courses/Categoriesmobile";
import CategoriesWeb from "../Comp/Courses/Categories";

const MainContent = () => {
  const [curr, setCurr] = React.useState(0);
  // React.useEffect(() => {
  //   // const SaveData = async () => {
  //   //   await setDoc(doc(db, "Courses", "data"), {
  //   //     data: courses,
  //   //   });
  //   // };
  //   // // SaveData();
  //   // console.log("done")
  // }, []);

  return (
    <div className="mt-[85px] sm:mt-[95px] flex  mx-auto  overflow-hidden ">
      <div className="flex flex-col overflow-hidden px-2">
        <div className=" mx-10 max-600:mt-7  max-900:hidden ">
          <CategoriesWeb curr={curr} setCurr={setCurr} />
        </div>
        <div className=" mx-10 mt-10 overflow-auto min-900:hidden ">
          <CategoriesMobile curr={curr} setCurr={setCurr} />
        </div>
        <div className="my-[20px]">
          <Loading data={data} curr={curr} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
