import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="z-[10000] h-[100vh] w-full absolute bottom-0 top-0 left-0 right-0 flex flex-col justify-center items-center bg-[#00000071]">
    <div>
    <Bars
        height="80"
        width="80"
        color="white"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
      <h3 className="text-white">Processing...</h3>
    </div>
  );
};

export default Loading;
