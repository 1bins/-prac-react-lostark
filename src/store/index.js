import characterReducer from './characterSlice'
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    character: characterReducer
  }
})