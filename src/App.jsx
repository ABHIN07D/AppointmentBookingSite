
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppoitmentForm from './components/AppointmentForm';
import AppoitmentList from './components/AppointmentList';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/appointmentForm" element={<AppoitmentForm/>}/>
        <Route path='/appointmentList' element={<AppoitmentList/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
