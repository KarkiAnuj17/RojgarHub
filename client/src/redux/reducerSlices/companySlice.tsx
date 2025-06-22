import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  companyName: '',
  industry: '',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyWebsite: '',
  companyDescription: '',
  isApproved: false,
  isRegistered: false,
  createdBy: '',
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    NullCompany: (state) => {
      return initialState;
    },
    addCompanyDetails: (state, action) => {
      const {
        _id,
        companyName,
        industry,
        companyEmail,
        companyPhone,
        companyAddress,
        companyWebsite,
        companyDescription,
        isApproved,
        isRegistered,
        createdBy,
      } = action.payload.company;

      return {
        ...state,
        _id,
        companyName,
        industry,
        companyEmail,
        companyPhone,
        companyAddress,
        companyWebsite,
        companyDescription,
        isApproved,
        isRegistered,
        createdBy,
      };
    },
  },
});

export const { NullCompany, addCompanyDetails } = companySlice.actions;

export default companySlice.reducer;
