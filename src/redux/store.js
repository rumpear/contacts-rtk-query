// import { configureStore } from '@reduxjs/toolkit';
import contactsAsyncSlice from './contactsAsyncSlice';

// export const store = configureStore({
//   reducer: { contacts: contactsAsyncSlice },
// });

import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from '../services/contactsApi';

export const store = configureStore({
  reducer: {
    contacts: contactsAsyncSlice,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  // middleware: getDefaultMiddleware => [
  //   ...getDefaultMiddleware,
  //   ...contactsAPI.middleware,
  // ],
});
