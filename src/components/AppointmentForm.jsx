import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Nav,
  Card,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const [errors, setErrors] = useState({});
  const [patient, setPatient] = useState({});
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  function handleChange(event) {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  }

  function handleClick() {
    navigate("/appointmentList", { state: { patients } });
  }

  useEffect(() => {}, [patients]);

  function validate() {
    let error = {};

    if (!patient.patientName || patient.patientName.trim() === "") {
      error.patientName = "Name is required";
    }

    if (!patient.patientAge) {
      error.patientAge = "Age is required";
    } 

    if (!patient.patientPlace || patient.patientPlace.trim() === "") {
      error.patientPlace = "Place is required";
    }

    if (!patient.doctorName) {
      error.doctorName = "Please select a doctor";
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setPatients([...patients, patient]);

    setPatient({
      patientName: "",
      patientAge: "",
      patientPlace: "",
      doctorName: "",
    });

    setErrors({});
  }

  return (
    <div className="cnt m-0">
      <Nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <img
            src="https://marketplace.canva.com/EAF-SBttJYg/1/0/1600w/canva-red-simple-medical-health-logo-0yxgC8dpegQ.jpg"
            alt="logo"
            width="50"
            height="44"
            className="rounded d-inline-block align-text-top ms-2"
          />
          <h4 className="ps-3 text-white fw-bold">
            Appointment Registration Form
          </h4>
          <button
            className="rounded justify-content-center bg-light text-success fw-bold"
            onClick={handleClick}
          >
            View List
          </button>
        </div>
      </Nav>
      <div className="d-flex justify-content-center mt-4">
        <Card
          className="p-4"
          style={{
            width: "70%",
            minHeight: "300px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            borderRadius: "12px",
            background: "white",
          }}
        >
          <CardHeader className=" rounded d-flex justify-content-center bg-success text-white">
            <h6>
              <i>Register Here</i>
            </h6>
          </CardHeader>
          <Form className="form m-4" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={patient.patientName || ""}
                onChange={handleChange}
                isInvalid={!!errors.patientName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.patientName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Age :</Form.Label>
              <Form.Control
                type="number"
                name="patientAge"
                value={patient.patientAge || ""}
                onChange={handleChange}
                isInvalid={!!errors.patientAge}
              />
              <Form.Control.Feedback type="invalid">
                {errors.patientAge}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Place:</Form.Label>
              <Form.Control
                type="text"
                name="patientPlace"
                value={patient.patientPlace || ""}
                onChange={handleChange}
                isInvalid={!!errors.patientPlace}
              />
              <Form.Control.Feedback type="invalid">
                {errors.patientPlace}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Doctor Name:</Form.Label>
              <Form.Select
                name="doctorName"
                value={patient.doctorName || ""}
                onChange={handleChange}
                isInvalid={!!errors.doctorName}
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Arun">Dr. Arun</option>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Joseph">Dr. Joseph</option>
                <option value="Dr. Lekshmi">Dr. Lekshmi</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.doctorName}
              </Form.Control.Feedback>
            </Form.Group>
            <CardFooter className=" rounded d-flex justify-content-center mt-4">
              <Button className="btn btn-success" type="submit">
                Submit
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AppointmentForm;
