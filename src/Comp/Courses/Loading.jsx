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
import { FaUserCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { CoursesContext } from "../../store/Context/courses";
import Loading from "../loader/LoadIsEnrolled";

function Media({ value, curr }) {
  const currCourse = React.useContext(CoursesContext);
  const handleCurrCourse = (item) => {
    currCourse?.setCurrCourse(item);
    localStorage.setItem("currCourse", JSON.stringify(item));
  };
  const Navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [Enrolled, setEnrolled] = React.useState([]);
  const [loadingEnroll, setLoadingEnroll] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const AssignEnrolled = async () => {
    const docRef = doc(db, "CoursesInProgress", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docSnap.data().data.forEach((course) => {
        setEnrolled((enrolledCourses) => [...enrolledCourses, course.id]);
      });
      console.log("Enrolled", Enrolled);
    } else {
      console.log("No such document!");
    }
  };
  const checkEnrolled = (id) => {
    return Enrolled.includes(id);
  };
  React.useEffect(() => {
    let isMounted = true;

    const getCourses = async () => {
      try {
        const docRef = doc(db, "Courses", "data");
        const docSnap = await getDoc(docRef);

        if (docSnap?.exists() && user) {
          const coursesData = docSnap.data().data;

          const docUser = doc(db, "Users", user?.uid);
          const docSnapUser = await getDoc(docUser);

          if (docSnapUser.exists() && isMounted) {
            const updatedCourses = coursesData.map((course) => {
              const courseProgress = docSnapUser
                ?.data()
                ?.coursesInProgress?.find(
                  (userCourse) => userCourse?.id === course?.id
                );

              return {
                ...course,
                courseProgress: courseProgress
                  ? Math.floor(
                      (courseProgress?.completedLessons?.length /
                        course?.content?.length) *
                        100
                    )
                  : 0,
              };
            });

            setCourses(updatedCourses);
          } else {
            console.log("No such document!");
          }
        } else {
          setCourses(docSnap?.data()?.data);
          console.log("No such document!");
        }
        AssignEnrolled();
        setTimeout(() => {
          setLoadingEnroll(false);
        }, 1000);

        setLoading(false);
        setTimeout(() => {
          setLoadingImage(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();

    // Cleanup function to set isMounted to false when the component unmounts
  }, []);

  return (
    <div className="">
      <Grid
        container
        wrap="wrap"
        className="justify-center flex-wrap  mx-auto  self-center  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {(loading ? Array.from(new Array(10)) : courses).map((item, index) => (
          <div
           className="max-600:!w-[90%] min-600:!w-[350px] max-600:mx-auto"
            key={index}
            style={{
              borderRadius: "16px",
              cursor: "pointer",
              border: !loading && "1px solid silver",
              padding: "10px",
            }}
          >
            <div
              onClick={() => {
                if(item){
                  handleCurrCourse(item);
                  Navigate(`/courses/${item?.title}`)
                }
              }}
              
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
                  <h5>{item.title}</h5>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {item?.instructor}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <div className="flex items-baseline gap-2">
                      <BsBook />
                      <h6>{item?.chapters} chapters</h6>
                    </div>
                  </Typography>
                  {user && loadingEnroll ? (
                    <Loading />
                  ) : (
                    <h6 className="flex text-green-500  items-center gap-[5px]">
                      {checkEnrolled(item?.id) ? <h6 className="flex text-green-500 mt-1 items-center gap-[5px]"><FaUserCheck/>Enrolled</h6> : <h6 className="mt-1 text-blue-500">230$</h6>}
                    </h6>
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
            </div>
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
    <div className="flex flex-wrap">
      {/* <Media loading /> */}
      <Media value={data} curr={curr} />
    </div>
  );
}
