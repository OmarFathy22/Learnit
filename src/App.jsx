/* eslint-disable no-undef */
import Root from "./Root";
import Profile from "./pages/Profile";
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import LeaderBoard from './pages/LeaderBoard'
import {useEffect} from 'react'
// import Home from "./pages/Home";
// import Create from "./pages/Create";oa

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CoursesDetails from "./pages/CoursesDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route exact path="/" element={<Root />}>
        <Route  path="/" element={<Home />} />
        <Route  path="profile/:uId" element={<Profile />} />
        <Route  path="courses/:courseId" element={<CoursesDetails />} />
        <Route  path="leaderboard" element={<LeaderBoard />} />
        <Route  path="dashboard" element={<DashBoard />} />
      </Route>
  )
);
function App() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
      localStorage.setItem("user", JSON.stringify({}));
    }
  } 
  , [])
  return (
      <RouterProvider router={router} />
  );
}


export default App;
