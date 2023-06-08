// creating an API slice 

// import createApi and FetchBaseQuery function 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// store API key and Host Key
const cryptoApiHeaders = {
  'X-RapidAPI-Key': process.env.CRYPTO_API_KEY,
    'X-RapidAPI-Host': process.env.CRYPTO_HOST_KEY,
};

// store cryptoApiheades in create request as an function
const createRequest = (url) => ({ url, headers: cryptoApiHeaders, });

// store URL in baseUrl 
const baseUrl= process.env.CRYPTO_BASE_URL;

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
    getCrptoExhchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  
  }),
});

// Export hooks for usage in functional components .which are 
// auto-generated based on the defined endpoints
export const {
  useGetCryptosQuery,
  useGetCrptoDetailsQuery,
  useGetCrptoHistoryQuery,
  useGetCrptoExhchangesQuery,
} = cryptoApi;