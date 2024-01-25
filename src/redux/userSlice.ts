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

const USER_DATA_KEY = 'userFormData';

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
      const userData = {
        ...state.formDataStep1,
        ...state.formDataStep2,
      };

      // Store in the array
      state.allFormData.push(userData);

      // Store in session storage
      const storedData = sessionStorage.getItem(USER_DATA_KEY);
      let storedArray: any[] = [];

      if (storedData) {
        storedArray = JSON.parse(storedData);
      }

      storedArray.push(userData);
      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(storedArray));
    },
    resetForm: (state) => {
      state.step = 1;
      state.formDataStep1 = {};
      state.formDataStep2 = {};
    },
  },
});

export const {
  setFormDataStep1,
  setFormDataStep2,
  nextStep,
  addFormData,
  resetForm,
} = userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
