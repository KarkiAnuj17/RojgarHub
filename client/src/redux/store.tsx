import { configureStore } from '@reduxjs/toolkit'
import   userSlice   from './reducerSlices/userSlice'
import  companySlice  from './reducerSlices/companySlice'
import reduxLogger from 'redux-logger'


export default configureStore({
  reducer: {
    user: userSlice,
    company:companySlice,
  },
  middleware : ()=>[reduxLogger]
})