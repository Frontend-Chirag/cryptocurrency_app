// created store.js for redux store


// ConfigureStore its a function call from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// for connecting our cryptoApi folder to store.js we simpliy import it
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';


// Now exporting ConfigureStore while passing an object in it 
// and the first object is reducer
export default configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  
    },

    // Adding the api middleware enables caching , invalidation, polling, and other useful features of 'rtk-query'
    middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat([ cryptoApi.middleware,  cryptoNewsApi.middleware])

  });