import React , {useState} from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../loader/Loading";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false)
  const [value , setValue] = useState("")
  const [username , setUsername] = useState("")
  const user = JSON.parse(localStorage.getItem("user"));
  const currCourse = JSON.parse(localStorage.getItem("currCourse"));
  const handleChange = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  }
  const handleChangeUser = (e) => {
    setUsername(e.target.value)
  }
  const updateUserCourses = async (user, currCourse) => {
    const docRef = doc(db, "CoursesInProgress", user?.uid);
    try {
      await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          throw new Error("Document does not exist!");
        }

        const user = doc.data();
        console.log("user", user)
        const updatedCoursesInProgress = [
          ...user.data,
          { ...currCourse , completedLessons: [] },
        ];

        transaction.update(docRef, {
          data: updatedCoursesInProgress,
        });
      });

      console.log("Transaction successfully committed!");
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const handleEnroll = async () => {
      try {
        const loadingToastId = toast.loading("Enrolling...", {
          autoClose: false,
        });

        await updateUserCourses(user, currCourse);
        toast.dismiss(loadingToastId);
        toast.success("Enrolled successfully 🎉");
        setTimeout(() => {
          navigate(`/courses/${currCourse.id}/chapters`);
        }, 1000);
      } catch (error) {
        console.error("Error during enrolling:", error);
        toast.dismiss(loadingToastId);
        toast.error("Could not enroll. Try again later 😞");
      }
    
  };
   const handleLoading = (params) => {
     setLoading(true)
     setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        setTimeout(() => {
          handleEnroll()
        }, 1000);
     }, 3000);
   }
  return (
    <div className=" h-[calc(100vh-64px)] w-full">
      {loading && <Loading />}
      {success ? (
        <MDBContainer
          className="mt-[64px] h-[calc(100vh-64px)] justify-center items-center flex"
          fluid
          style={{
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
          }}
        >
          <div className="bg-white px-5  pt-4 pb-3 flex justify-center items-center rounded-md">
            <div className="flex items-start  gap-2">
              <FaCheckCircle className="text-green-600 pt-1 text-[30px]" />
              <h3 className="text-green-600">Successful Payment</h3>
            </div>
          </div>
        </MDBContainer>
      ) : (
        <MDBContainer
          className="mt-[64px] h-[calc(100vh-64px)] "
          fluid
          style={{
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
          }}
        >
          <MDBRow className=" d-flex justify-content-center items-center  h-full !text-black mt-3">
            <MDBCol md="10" lg="8" xl="5">
              <MDBCard className="rounded-3">
                <MDBCardBody className="p-4">
                  <div className="text-center mb-4">
                    <h3 className="text-black">Skills Hub</h3>
                    <h6>Payment</h6>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4 pb-1">
                    <img
                      className="img-fluid"
                      src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    />
                    <img
                      className="img-fluid"
                      src="https://img.icons8.com/color/48/000000/visa.png"
                    />
                    <div className="flex-fill mx-3">
                      <div className="form-outline">
                        <MDBInput
                          label="Card Number"
                          id="form1"
                          type="text"
                          size="lg"
                          onChange={handleChange}
                          maxLength={16}
                          required
                          //accept only numbers 
                          value={value}
                        />
                      </div>
                    </div>
                  </div>

                  <MDBRow className="my-4">
                    <MDBCol size="6">
                      <MDBInput
                        label="Cardholder's Name"
                        id="form3"
                        type="text"
                        size="lg"
                        value={username}
                        required
                        onChange={handleChangeUser}
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="Expire"
                        id="form5"
                        type="password"
                        size="lg"
                        placeholder="MM/YYYY"
                        required
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="CVV"
                        id="form6"
                        type="password"
                        size="lg"
                        placeholder="CVV"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn color="success" size="lg" block onClick={() => {
                    console.log("pressed")
                    handleLoading()
                  }}>
                    Proceed
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </div>
  );
}
