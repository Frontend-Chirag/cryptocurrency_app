// creating an API slice 

// import createApi and FetchBaseQuery function 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// store API key and Host Key
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'f77e8b150bmsh17052566c08fd96p1f455fjsn915af81845d0',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

// store cryptoApiheades in create request as an function
const createRequest = (url) => ({ url, headers: cryptoApiHeaders, });

// store URL in baseUrl 
const baseUrl= 'https://coinranking1.p.rapidapi.com/';

// Define a service using a base url and expected endpoints
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({ 
    getCryptos: builder.query({ 
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCrptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCrptoHistory: builder.query({
      query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  
  }),
});

// Export hooks for usage in functional components .which are 
// auto-generated based on the defined endpoints
export const {
  useGetCryptosQuery,
  useGetCrptoDetailsQuery,
  useGetCrptoHistoryQuery,
} = cryptoApi;