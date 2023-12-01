import { createContext } from "react";
import React from "react";

export const CoursesContext = createContext({
  currCourse: {},
  setCurrCourse: (course) => {},
});

function CoursesProvider({ children }) {
  const [currCourse, setCurrCourse] = React.useState({});
  function setCurrCourseHandler(course) {
    setCurrCourse(course);
  }
  const value = { currCourse: currCourse, setCurrCourse: setCurrCourseHandler };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}
export default CoursesProvider;
