import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
    <Bars
        height="20"
        width="30"
        color="white"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
