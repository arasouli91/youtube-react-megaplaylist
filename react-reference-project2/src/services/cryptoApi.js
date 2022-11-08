import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
       //'x-access-token': 'coinranking4e97b992dfa83e8f1f59f6d8de9a43d4b8335d810893d594'  
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': 'dd06d9006amsh64cd2bd1911b91bp1d5797jsncfa82c34d726',
        'x-access-token': 'i-have-to-migrate-to-v2'  
        
}

//const baseUrl = 'https://api.coinranking.com/v2/migration';
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url,headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins${count ? "?limit="+count : ""}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
        }),
        getCryptoExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        })
    })
});

// use + getCryptos + Query
// you have to add the use and query so that you will
// be using the hook provided by toolkit
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery,
} = cryptoApi;