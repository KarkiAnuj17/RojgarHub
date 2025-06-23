import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './reducerSlices/userSlice';
import reduxLogger from 'redux-logger';
import  companySlice  from './reducerSlices/companySlice';

const rootReducer = combineReducers({
  user: userSlice,
  company :companySlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: ()=> [reduxLogger]
});

export const persistor = persistStore(store);
