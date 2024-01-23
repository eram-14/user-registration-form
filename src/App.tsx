// App.tsx

import React from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { nextStep, prevStep, setFormDataStep1, setFormDataStep2 } from './redux/userSlice';
import Step1Form from './Components/Step1Form';
import Step2Form from './Components/Step2Form';
import DataTables from './Components/DataTables';
import { Button, AppBar, Tab, Tabs } from '@material-ui/core';
import UserDataTablePage from './Components/UserDataTablePage';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formDataStep1, formDataStep2 } = useSelector(
    (state: RootState) => state.user
  );

  const [navigateToUserData, setNavigateToUserData] = React.useState(false);

  const handleStep1Submit = (data: any) => {
    dispatch(setFormDataStep1(data));
    dispatch(nextStep());
  };

  const handleStep2Submit = (data: any) => {
    dispatch(setFormDataStep2(data));
    // Set the flag to navigate to user-data
    setNavigateToUserData(true);
  };

  const handlePrevStep = () => {
    dispatch(prevStep());
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Tabs>
          <Tab label="Home" to="/" component={Link} />
          <Tab label="User Data" to="/user-data" component={Link} />
        </Tabs>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={(step === 1) ?
            <Step1Form onSubmit={handleStep1Submit} /> :
            <>
              <Step2Form onSubmit={handleStep2Submit} />
              {navigateToUserData && <Navigate to="/user-data" />}
            </>
          }
        />
        <Route path="/user-data" element={<UserDataTablePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
