// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        changePassword: builder.mutation({
            query: ({ password, token }) => ({
                url: '/auth/change',
                method: 'POST',
                body: { password },
                headers: {
                    authorization: 'Bearer ' + token
                },
            }),
        }),
        upload: builder.mutation({
            query: ({ file, token }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/admin/upload',
                    method: 'POST',
                    body: formData,
                    headers: {
                        authorization: 'Bearer ' + token
                    },
                };
            },
        }),
        checkToken: builder.query({
            query: (token) => ({
                url: '/auth/profile',
                method: 'GET', // or 'GET' depending on your API
                headers: {
                    authorization: 'Bearer ' + token
                }
            }),
        }),
        getAllClients: builder.query({
            query: (token) => ({
                url: '/admin/get/clients',
                method: 'GET', // or 'GET' depending on your API
                headers: {
                    authorization: 'Bearer ' + token
                },
            }),
        }),
        getAllSites: builder.query({
            query: (token) => ({
                url: '/production-sites',
                method: 'GET', // or 'GET' depending on your API
                headers: {
                    authorization: 'Bearer ' + token
                },
            }),
        }),
        getAllMachines: builder.query({
            query: (token) => ({
                url: '/machines',
                method: 'GET', // or 'GET' depending on your API
                headers: {
                    authorization: 'Bearer ' + token
                }
            }),
        }),
        getAllPieces: builder.query({
            query: (token) => ({
                url: '/pieces',
                method: 'GET', // or 'GET' depending on your API
                headers: {
                    authorization: 'Bearer ' + token
                }
            }),
        }),
    }),
});

export const { useLoginMutation, useCheckTokenQuery, useGetAllSitesQuery, 
    useGetAllMachinesQuery, useUploadMutation, useChangePasswordMutation, 
    useGetAllPiecesQuery, useGetAllClientsQuery } = api;

export default api;
