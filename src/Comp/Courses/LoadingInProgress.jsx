import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { data } from "../../../Data";
import { BsBook } from "react-icons/bs";
import UserProgress from "../Login/UserProgress";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { CoursesContext } from "../../store/Context/courses";
import {BsCheck2Circle} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
function Media({ value, curr }) {
  const currCourse = React.useContext(CoursesContext);
  const handleCurrCourse = (item) => {
    currCourse.setCurrCourse(item);
    localStorage.setItem("currCourse", JSON.stringify(item));
  };
  const [loading, setLoading] = React.useState(true);
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const [completedCourses, setCompletedCourses] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(completedCourses)
  React.useEffect(() => {
    const getCoursesInProgress = (params) => {
      const docRef = doc(db, "Users", user?.uid);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        setCourses(docSnapshot?.data()?.coursesInProgress);
        setCompletedCourses(docSnapshot?.data()?.completedCourses);
      });
      setLoading(false);
      setLoadingImage(false);
      return () => {
        unsubscribe();
      };
    };
    getCoursesInProgress();
    console.log("courses", courses);
  }, []);
  
  return (
    <div className="w-full">
      <Grid
        container
        wrap="wrap"
        className="justify-center flex-wrap  mx-auto  self-center  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
            <div className=' mt-[100px] w-[90%] max-600:mt-[120px] gap-5 flex   '>
          <div  className={`p-2 w-1/2 flex items-center border-[1px] border-gray-300 rounded-md gap-3 cursor-pointer  `} >
            <h1 className='text-[40px] max-600:text-[25px]  text-[white] bg-[#1a5b65a5] rounded-full p-1'><BiTimeFive/></h1>
            <div>
              <h6 className='font-bold max-600:text-[13px]'>In Progress</h6>
              <h6 className="max-600:text-[13px]">{courses?.length} Courses</h6>
            </div>
          </div>
          <div  className={`p-2 w-1/2 flex items-center border-[1px] border-gray-300 rounded-md gap-3 cursor-pointer `}> 
            <h1 className='text-[40px] max-600:text-[25px] text-[white] bg-[#2ea72e4d] rounded-full p-1'><BsCheck2Circle/></h1>
            <div>
              <h6 className='font-bold max-600:text-[13px]'>Completed </h6>
              <h6 className="max-600:text-[13px]">{completedCourses} Courses</h6>
            </div>
          </div>
    
    
    
          
      </div>
        {(loading ? Array.from(new Array(10)) : courses)?.map((item, index) => (
          <div
            key={index}
            style={{
              width: 350,
              borderRadius: "16px",
              cursor: "pointer",
              border: !loading && "1px solid silver",
              padding: "10px",
            }}
          >
            <Link
              onClick={() => {
                handleCurrCourse(item);
              }}
              to={`/courses/${item?.title}`}
            >
              {item ? (
                <img
                  alt={item.title}
                  src={item.banner}
                  className={` image ${
                    loadingImage ? "loading" : ""
                  } rounded-[16px] `}
                />
              ) : (
                <Skeleton variant="rectangular" width={180} height={118} />
              )}

              {item ? (
                <Box sx={{ pr: 2, mt: 2 }}>
                  <Typography gutterBottom variant="body2 ">
                    {item.title}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {item.instructor}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <div className="flex items-baseline gap-2">
                      <BsBook />
                      <h6>{item.chapters} chapters</h6>
                    </div>
                  </Typography>
                  {user ? (
                    <Typography variant="caption" color="text.secondary">
                      <div className="mt-1">
                        <UserProgress value={(item?.completedLessons?.length / item?.chapters)*100} />
                        <h1 className="text-[13px] mt-1 text-blue-900">
                          {Math.floor((item?.completedLessons?.length / item?.chapters)*100)}% Complete
                        </h1>
                      </div>
                    </Typography>
                  ) : (
                    <h1 className="mt-3 text-[#4dbbe0]">Free</h1>
                  )}
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="30%" />
                </Box>
              )}
            </Link>
          </div>
        ))}
      </Grid>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube({ data, curr }) {
  return (
    <div className="flex flex-wrap w-full">
      {/* <Media loading /> */}
      <Media value={data} curr={curr} />
    </div>
  );
}