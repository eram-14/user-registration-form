import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { nextStep, setFormDataStep1, setFormDataStep2 } from './redux/userSlice';
import Step1Form from './Components/Step1Form';
import Step2Form from './Components/Step2Form';
import Navbar from './Components/Navbar';
import DataTables from './Components/DataTables';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formDataStep1, formDataStep2 } = useSelector(
    (state: RootState) => state.user
  );

  const handleStep1Submit = () => {
    dispatch(setFormDataStep1(formDataStep1));
    dispatch(nextStep());
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            step === 1 ? <Step1Form onSubmit={handleStep1Submit} /> : step === 2 ? <Step2Form /> : null
          }
        />
        <Route path="/user-data" element={<DataTables />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
