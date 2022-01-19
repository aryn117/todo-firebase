import { configureStore } from '@reduxjs/toolkit';
import { userDataSlice } from './userData';

export default configureStore({
  reducer: {
    userData: userDataSlice.reducer,
  },
});
