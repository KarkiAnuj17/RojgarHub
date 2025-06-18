import { configureStore } from '@reduxjs/toolkit'
import   userSlice   from './reducerSlices/userSlice'


export default configureStore({
  reducer: {
    user: userSlice,
  }
})