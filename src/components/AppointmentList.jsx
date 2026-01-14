import { Button, Card, Table, CardHeader, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function AppointmentList() {
  const location = useLocation();
  const [patients, setPatients] = useState(location.state?.patients || []);
  const [selectedId, setSelectedId] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState({
    patientName: "",
    patientAge: "",
    patientPlace: "",
    doctorName: "",
  });

  function handleSelect(index) {
    setSelectedId(index);
    setSelectedPatient(patients[index]);
  }

  function handleChange(e) {
    setSelectedPatient({
      ...selectedPatient,
      [e.target.name]: e.target.value,
    });
  }

  function handleCancel() {
    setSelectedId(-1);
  }

  function handleSave() {
    const updatedPatients = patients.map((patient, index) =>
      index === selectedId ? selectedPatient : patient
    );
    setPatients(updatedPatients);
    setSelectedId(-1);
  }

  function confirmDelete(index) {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  }

  function handleDeleteConfirmed() {
    const updatedPatients = patients.filter((_, i) => i !== deleteIndex);
    setPatients(updatedPatients);
    setShowDeleteModal(false);
    setDeleteIndex(null);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-4" style={{ width: "98%" }}>
        <CardHeader className="bg-success text-white text-center">
          <h6>Appointment List</h6>
        </CardHeader>

        <Table striped bordered hover className="text-center mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Place</th>
              <th>Doctor</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {selectedId === index ? (
                    <Form.Control
                      name="patientName"
                      value={selectedPatient.patientName}
                      onChange={handleChange}
                    />
                  ) : (
                    patient.patientName
                  )}
                </td>

                <td>
                  {selectedId === index ? (
                    <Form.Control
                      type="number"
                      name="patientAge"
                      value={selectedPatient.patientAge}
                      onChange={handleChange}
                    />
                  ) : (
                    patient.patientAge
                  )}
                </td>

                <td>
                  {selectedId === index ? (
                    <Form.Control
                      name="patientPlace"
                      value={selectedPatient.patientPlace}
                      onChange={handleChange}
                    />
                  ) : (
                    patient.patientPlace
                  )}
                </td>

                <td>
                  {selectedId === index ? (
                    <Form.Select
                      name="doctorName"
                      value={selectedPatient.doctorName}
                      onChange={handleChange}
                    >
                      <option value="">Select Doctor</option>
                      <option value="Dr. Arun">Dr. Arun</option>
                      <option value="Dr. Meera">Dr. Meera</option>
                      <option value="Dr. Joseph">Dr. Joseph</option>
                      <option value="Dr. Lekshmi">Dr. Lekshmi</option>
                    </Form.Select>
                  ) : (
                    patient.doctorName
                  )}
                </td>

                <td>
                  {selectedId === index ? (
                    <Button variant="success" onClick={handleSave}>
                      Save
                    </Button>
                  ) : (
                    <Button onClick={() => handleSelect(index)}>Update</Button>
                  )}
                </td>

                <td>
                  {selectedId === index ? (
                    <Button variant="warning" onClick={handleCancel}>
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(index)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header  className="d-flex justify-content-center bg-success text-white">
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete this appointment?
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
}

export default AppointmentList;
