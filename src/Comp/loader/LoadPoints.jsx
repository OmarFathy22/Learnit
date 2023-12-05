import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
    <Bars
        height="100"
        width="100"
        color="#333"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
