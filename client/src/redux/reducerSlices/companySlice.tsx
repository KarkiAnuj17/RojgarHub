import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    _id:'',
    companyName :'',
    companyEmail:'',
    companyPhone:'',
    companyAddress: '',
    companyWebsite:'',
    companyDescription:'',
    isApproved:'',
}
export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompanyDetails:(state,action)=>{
      const {companyName,companyEmail,companyPhone,companyAddress,companyWebsite,companyDescription,isApproved,_id}=action.payload.user
      return{
        ...state,
        companyEmail:companyEmail,
        companyName:companyName,
        companyPhone:companyPhone,
        companyAddress:companyAddress,
        companyWebsite:companyWebsite,
        companyDescription:companyDescription,
        isApproved:isApproved,
        _id :_id
      }
    }
  }
})
export const { addCompanyDetails } = companySlice.actions

export default companySlice.reducer