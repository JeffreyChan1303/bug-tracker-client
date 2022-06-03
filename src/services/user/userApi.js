import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApiHeaders = {

}


const baseUrl = 'http://localhost:9000';

export const userApi = createApi({
    reducerPath: 'userApi', // name
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // this is the sign in action query
        signIn: builder.mutation({
            query: (formData) => {
                
                return {
                    url: '/users/signin',
                    method: 'POST',
                    body: formData,
                }
            }
        }),
        signUp: builder.mutation({
            query: (formData) => {
                return {
                    url: '/users/signup',
                    method: 'POST',
                    body: formData,
                }
            }
        }),
        createUser: builder.mutation({
            query: (newUser) => {
                console.log("Created User: ", newUser);
                return {
                    url: `/users/createUser`,
                    method: 'POST',
                    body: newUser, // this is the payload
                    headers: userApiHeaders,
                }
            }
        }),
        updateUser: builder.mutation({
            query: (updatedUser) => {
                console.log("Updated User: ", updatedUser);
                return {
                    url: `/users/updateUser/${updatedUser._id}`,
                    method: 'PATCH',
                    body: updatedUser,
                    headers: userApiHeaders,
                }
            }
        }),
        getUserDetails: builder.query({
            query: (id) => {
                return {
                    url: `/users/userDetails/${id}`,
                    method: 'GET',
                    headers: userApiHeaders,
                }
            },
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                console.log("Deleted User Id: ", id);
                return {
                    url: `/users/deleteUser/${id}`,
                    method: 'DELETE',
                }
            }
        })
    })
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery,
    useDeleteUserMutation,
} = userApi;

