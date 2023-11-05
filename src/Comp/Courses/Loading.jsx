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

function Media({ value }) {
  const [loading, setLoading] = React.useState(true);
  const [loadingImage, setLoadingImage] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setLoadingImage(false);
    }, 3000);
  }, []);

  return (
    <div className="flex  justify-center">
      <Grid
        container
        wrap="wrap"
        className="justify-center  mx-auto  self-center  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {(loading ? Array.from(new Array(10)) : value).map((item, index) => (
          <Box
            key={index}
            sx={{
              width: 210,
              borderRadius: 2,
              cursor: "pointer",
              border: `${!loading && "1px solid silver"}`,
              p: 1,
            }}
          >
            <Link to={`/courses/${item?.title}`}>
              {item ? (
                <img
                  style={{ width: 210, height: 118 }}
                  alt={item.title}
                  src={item.src}
                  className={`image ${
                    loadingImage ? "loading" : ""
                  } rounded-md `}
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
          </Box>
        ))}
      </Grid>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube({ data }) {
  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* <Media loading /> */}
      <Media value={data} />
    </Box>
  );
}
