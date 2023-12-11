import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBValidationItem,
  MDBCheckbox,
  MDBTextArea,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../loader/Loading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    courseName: "",
    courseLink: "",
    price: "",
    overview: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
    console.log(info);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "Instructor", user?.uid), {
        ...info,
      });
      toast.success("Successfully submitted");
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" max-600:mt-[120px] max-600:mb-4   min-h-[90vh] mt-[10vh] flex justify-center items-center  w-full">
      {loading && <Loading />}
      {success ? (
        <MDBContainer
          className=" max-w-[500px] justify-center items-center flex"
          fluid
        >
          {" "}
          <div className="bg-white p-4 rounded-md ">
            <div className="flex-col align-items-start gap-2">
            <div className="flex justify-center items-center border-[2px] rounded-md mb-1 border-green-600 gap-1 ">
                <FaCheckCircle className="text-success text-[25px] "  />
                  <h6 className="text-success  text-[20px] pt-2">
                    Thank you for submitting your information.
                  </h6>
            </div>
                <p className="text-[#333] font-size-20">
                   We appreciate your interest. Our team will
                  carefully review the details, and you can expect to receive a
                  response via email within the next 48 hours. If you have any
                  urgent concerns, please do not hesitate to contact us directly.
                  We sincerely appreciate your patience.
                </p>
            </div>
          </div>
        </MDBContainer>
      ) : (
        <MDBContainer className="] " fluid>
          <form onSubmit={handleSubmit}>
            <MDBRow className=" d-flex justify-content-center items-center h-full  !text-black ">
              <MDBCol md="10" lg="8" xl="5">
                <MDBCard className="rounded-3">
                  <MDBCardBody className="p-4">
                    <div className="text-center mb-4">
                      <h3 className="text-black">Skills Hub</h3>
                      <h6>Please share some information about the course</h6>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-3 mb-4 pb-1">
                      <div className="flex-fill mx-3 flex flex-col gap-3">
                        <div className="form-outline ">
                          <MDBInput
                            required
                            label="Name"
                            id="name"
                            type="text"
                            size="lg"
                            onChange={handleChange}

                            //accept only numbers
                          />
                        </div>

                        <div className="form-outline ">
                          <MDBInput
                            required
                            label="Course Name"
                            id="courseName"
                            type="text"
                            size="lg"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-outline ">
                          <MDBTextArea
                            onChange={handleChange}
                            className=" resize-none"
                            label="brief overview of the course"
                            id="overview"
                            rows={4}
                          />
                        </div>
                        <div className="form-outline ">
                          <MDBInput
                            required
                            label="Price ($)"
                            id="price"
                            type="number"
                            size="lg"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-outline ">
                          <MDBInput
                            required
                            label="Course Link on Google Drive or Mega"
                            id="courseLink"
                            type="text"
                            size="lg"
                            onChange={handleChange}
                          />
                        </div>
                        <MDBValidationItem
                          className="col-12"
                          feedback="You must agree before submitting."
                          invalid
                        >
                          <MDBCheckbox
                            label="Agree to terms and conditions"
                            id="invalidCheck"
                            required
                          />
                        </MDBValidationItem>
                        <div className="col-12 flex justify-center">
                          <MDBBtn type="submit">Submit form</MDBBtn>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      )}
    </div>
  );
}
