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
import Categories from "./Categories";

function Media({ value , curr }) {
  const [loading, setLoading] = React.useState(true);
  const [loadingImage, setLoadingImage] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    setLoadingImage(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setLoadingImage(false);
    }, 3000);
  }, [curr]);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setLoadingImage(false);
    }, 3000);
  }, []);

  return (
      <div className="">
        <Grid
          container
          wrap="wrap"
          className="justify-center flex-wrap  mx-auto  self-center  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        >
          {(loading ? Array.from(new Array(10)) : value).map((item, index) => (
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
              <Link to={`/courses/${item?.title}`}>
                {item ? (
                  <img
                    

                    alt={item.title}
                    src={item.src}
                    className={` image ${
                      loadingImage ? "loading" : ""
                    } rounded-[16px] `}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={180} height={118} />
                )}
    
                {item ? (
                  <Box sx={{ pr: 2, mt: 2 }}>
                    <Typography gutterBottom variant="body2">
                      {item.title}
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.channel}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <div className="flex items-center gap-2">
                        <BsBook />
                        <h1>{item.chapters} chapters</h1>
                      </div>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <div className="mt-1">
                        <UserProgress value={0} />
                        <h1 className="text-[13px] mt-1 text-blue-900">
                          {item.progress}% Complete
                        </h1>
                      </div>
                    </Typography>
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

export default function YouTube({ data , curr }) {
  return (
    <div className="flex flex-wrap">
      {/* <Media loading /> */}
      <Media value={data} curr={curr} />
    </div>
  );
}
