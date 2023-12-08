import React from "react";
import Loading from "../Comp/Courses/Loading";
import { data } from "../../Data";
import CategoriesMobile from "../Comp/Courses/Categoriesmobile";
import CategoriesWeb from "../Comp/Courses/Categories";
import { courses } from "../../Data";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const MainContent = () => {
  const [curr, setCurr] = React.useState(0);
  React.useEffect(() => {
    const SaveData = async () => {
      await setDoc(doc(db, "Courses", "data"), {
        data: courses,
      });
    };
    // SaveData();
  }, []);
  return (
    <div className="mt-[50px] sm:mt-[95px] flex  mx-auto  overflow-hidden ">
      <div className="flex flex-col overflow-hidden px-2">
        {/* <div className=" mx-10 max-600:mt-7 mb-2   max-900:hidden ">
          <CategoriesWeb curr={curr} setCurr={setCurr} />
        </div>
        <div className="mx-10 mt-[101px] mb-2  overflow-auto min-900:hidden ">
          <CategoriesMobile curr={curr} setCurr={setCurr} />
        </div> */}
        <div className="my-[50px]">
          <Loading data={data} curr={curr} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
