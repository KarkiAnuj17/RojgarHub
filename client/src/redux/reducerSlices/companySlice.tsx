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
      const { isApproved, isRegistered} = action.payload
      const {_id,companyName,industry,companyEmail,companyPhone,companyAddress,companyWebsite,companyDescription,createdBy,} = action.payload.company;

      return {
        ...state,
        _id:_id,
        companyName:companyName,
        industry:industry,
        companyEmail:companyEmail,
        companyPhone:companyPhone,
        companyAddress:companyAddress,
        companyWebsite:companyWebsite,
        companyDescription:companyDescription,
        isApproved:isApproved,
        isRegistered:isRegistered,
        createdBy:createdBy,
      };
    },
  },
});

export const { NullCompany, addCompanyDetails } = companySlice.actions;

export default companySlice.reducer;
