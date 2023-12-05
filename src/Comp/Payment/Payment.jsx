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

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false)
   const handleLoading = (params) => {
     setLoading(true)
     setTimeout(() => {
        setLoading(false)
        setSuccess(true)
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
                    <h3 className="text-black">Learn it</h3>
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
                          value="**** **** **** ****"
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
                        value="Name"
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="Expire"
                        id="form5"
                        type="password"
                        size="lg"
                        placeholder="MM/YYYY"
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="CVV"
                        id="form6"
                        type="password"
                        size="lg"
                        placeholder="CVV"
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