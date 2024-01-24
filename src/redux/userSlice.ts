// userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserRegistrationState {
  step: number;
  formDataStep1: any;
  formDataStep2: any;
  allFormData: any[];
}

const initialState: UserRegistrationState = {
  step: 1,
  formDataStep1: {},
  formDataStep2: {},
  allFormData: [],
};

const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {
    setFormDataStep1: (state, action: PayloadAction<any>) => {
      state.formDataStep1 = action.payload;
    },
    setFormDataStep2: (state, action: PayloadAction<any>) => {
      state.formDataStep2 = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    addFormData: (state) => {
      state.allFormData.push({
        ...state.formDataStep1,
        ...state.formDataStep2,
      });
    },
  },
});

export const {
  setFormDataStep1,
  setFormDataStep2,
  nextStep,
  addFormData,
} = userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
