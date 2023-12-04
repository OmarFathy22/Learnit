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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { CoursesContext } from "../../store/Context/courses";

function Media({ value, curr }) {
  const currCourse = React.useContext(CoursesContext);
  const handleCurrCourse = (item) => {
    currCourse.setCurrCourse(item);
    localStorage.setItem("currCourse", JSON.stringify(item));
  }
  const [loading, setLoading] = React.useState(true);
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    const GetCourses = async (params) => {
      const docRef = doc(db, "Courses", "data");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourses(docSnap.data().data);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
      setTimeout(() => {
        setLoadingImage(false);
      }, 100);
    };
    GetCourses();
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
            key={index}
            style={{
              width: 350,
              borderRadius: "16px",
              cursor: "pointer",
              border: !loading && "1px solid silver",
              padding: "10px",
            }}
          >
            <Link onClick={() => {
              handleCurrCourse(item)
            }} to={`/courses/${item?.title}`}>
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
                  <h5>
                    {item.title}
                  </h5>
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
                        <UserProgress value={0} />
                        <h1 className="text-[13px] mt-1 text-blue-900">
                          {0}% Complete
                        </h1>
                      </div>
                    </Typography>
                  ) : (
                    <h6 className="mt-3 text-[#4dbbe0]">Free</h6>
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
    <div className="flex flex-wrap">
      {/* <Media loading /> */}
      <Media value={data} curr={curr} />
    </div>
  );
}
