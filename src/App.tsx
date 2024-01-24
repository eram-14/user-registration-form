import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { nextStep, prevStep, setFormDataStep1, setFormDataStep2 } from './redux/userSlice';
import Step1Form from './Components/Step1Form';
import Step2Form from './Components/Step2Form';
import { AppBar, Tab, Tabs, Button } from '@material-ui/core';
import UserDataTablePage from './Components/UserDataTablePage';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formDataStep1, formDataStep2 } = useSelector(
    (state: RootState) => state.user
  );

  const handleStep1Submit = () => {
    dispatch(setFormDataStep1(formDataStep1));
    dispatch(nextStep());
  };

  const handleStep2Submit = () => {
    dispatch(setFormDataStep2(formDataStep2));
  };

  const activeTab = step === 1 ? 0 : step === 2 ? 1 : 0;

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Tabs value={activeTab}>
          <Tab label="Home" to="/" component={Link} />
          <Tab label="User Data" to="/user-data" component={Link} />
        </Tabs>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            step === 1 ? <Step1Form onSubmit={handleStep1Submit} /> : step === 2 ? <Step2Form  /> : null
          }
        />
        <Route path="/user-data" element={<UserDataTablePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
