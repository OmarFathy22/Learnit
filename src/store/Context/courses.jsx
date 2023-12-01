import { createContext } from "react";
import React from "react";

export const CoursesContext = createContext({
  currCourse: {name:"omar"},
  setCurrCourse: (course) => {},
});

function CoursesProvider({ children }) {
  const [currCourse, setCurrCourse] = React.useState({});
  function setCurrCourseHandler(course) {
    setCurrCourse(course);
  }
  const value = { currCourse, setCurrCourse };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}
export default CoursesProvider;
