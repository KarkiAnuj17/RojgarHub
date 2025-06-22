import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    _id:'',
    companyName :'',
    companyEmail:'',
    companyPhone:'',
    companyAddress: '',
    companyWebsite:'',
    companyDescription:'',
    isRegistered:'',
    isApproved:'',
}
export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompanyDetails:(state,action)=>{
      const {isRegistered}=action.payload
      const {companyName,companyEmail,companyPhone,companyAddress,companyWebsite,companyDescription,isApproved,_id}=action.payload.company
      return{
        ...state,
        companyEmail:companyEmail,
        companyName:companyName,
        companyPhone:companyPhone,
        companyAddress:companyAddress,
        companyWebsite:companyWebsite,
        companyDescription:companyDescription,
        isApproved:isApproved,
        isRegistered:isRegistered,
        _id :_id
      }
    }
  }
})
export const { addCompanyDetails } = companySlice.actions

export default companySlice.reducer