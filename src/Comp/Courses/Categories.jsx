import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categories } from "../../../Data";

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  if (!onClick) {
    return null;
  }
  return (
    <div
      className={className + " z-10 left-[1px] "}
      style={{
        ...style,
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "25px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
      onClick={onClick}
    >
      <svg
        className="absolute left-2 top-2"
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="34px"
        height="34px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M15.59 7.41L14.17 6l-6 6 6 6 1.41-1.41L10.83 12l4.76-4.59z" />
      </svg>
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  if (!onClick) {
    return null;
  }
  return (
    <div
      className={className + " z-10 right-[1px]"}
      style={{
        ...style,
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "25px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
      onClick={onClick}
    >
      <svg
        className="absolute left-2 top-2"
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="34px"
        height="34px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M8.41 16.59L9.83 18l6-6-6-6-1.41 1.41L13.17 12l-4.76 4.59z" />
      </svg>
    </div>
  );
}

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 9,
  slidesToScroll: 2,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        // infinite: true,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        // infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Categories = ({ curr, setCurr }) => {
  return (
    <Slider {...settings} className="pl-[70px] w-full mx-auto  active2 mt-5 pr-[30px] ">
      {categories.map((category, index) => (
        <li
          key={index}
          className={` mr-2 !w-[220px]  flex justify-center items-center  text-center cursor-pointer border-[2px] whitespace-nowrap border-gray-300 rounded-md ${
            index === curr ? "border-blue-400 bg-blue-100" : ""
          }`}
          onClick={() => setCurr(index)}
        >
          {category}
        </li>
      ))}
    </Slider>
  );
};

export default Categories;
