/* eslint-disable no-undef */
import Root from "./Root";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import LeaderBoard from "./pages/LeaderBoard";
import SpecificCourse from "./pages/SpecificCourse";
import Payment from "./pages/Payment";
import InstructorForm from "./pages/BecomeInstructor";
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
      <Route path="/" element={<Home />} />
      <Route path="courses/:courseId" element={<CoursesDetails />} />
      <Route path="courses/:courseId/chapters" element={<SpecificCourse />} />
      <Route path="leaderboard" element={<LeaderBoard />} />
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="payment" element={<Payment />} />
      <Route path="instructor" element={<InstructorForm />} />

      {/* <Route  path="dashboard" element={<DashBoard />} /> */}
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
