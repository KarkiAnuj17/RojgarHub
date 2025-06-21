import { configureStore } from '@reduxjs/toolkit'
import   userSlice   from './reducerSlices/userSlice'
import  companySlice  from './reducerSlices/companySlice'


export default configureStore({
  reducer: {
    user: userSlice,
    company:companySlice,
  }
})