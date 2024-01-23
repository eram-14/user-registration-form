// App.tsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { nextStep, prevStep, setFormDataStep1, setFormDataStep2 } from './redux/userSlice';
import Step1Form from './Components/Step1Form';
import Step2Form from './Components/Step2Form';
import DataTables from './Components/DataTables';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formDataStep1, formDataStep2 } = useSelector(
    (state: RootState) => state.user
  );

  const handleStep1Submit = (data: any) => {
    dispatch(setFormDataStep1(data));
    dispatch(nextStep());
  };

  const handleStep2Submit = (data: any) => {
    dispatch(setFormDataStep2(data));
  };

  const handlePrevStep = () => {
    dispatch(prevStep());
  };

  const dataTableData = useMemo(() => {
    return [formDataStep1, formDataStep2].filter(Boolean);
  }, [formDataStep1, formDataStep2]);

  return (
    <div>
      {step === 1 && <Step1Form onSubmit={handleStep1Submit} />}
      {step === 2 && <Step2Form onSubmit={handleStep2Submit} />}
      {step === 2 && (
        <div>
          <Button onClick={handlePrevStep}>Previous</Button>
          <DataTables data={dataTableData} />
        </div>
      )}
    </div>
  );
};

export default App;
