import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const projectApiHeaders = {

}

const createRequest = (url) => ({ url, headers: projectApiHeaders })

const baseUrl = 'http://localhost:9000';

export const projectApi = createApi({
    reducerPath: 'projectApi', // name
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => createRequest('/projects/allProjects'),
        }),
        createProject: builder.mutation({
            query: (newProject) => {
                console.log("Created Project: ", newProject);
                return {
                    url: `/projects/createProject`,
                    method: 'POST',
                    body: newProject, // this is the payload
                    headers: projectApiHeaders, 
                }
            }
        })
    })
});

export const {
    useGetAllProjectsQuery,
    useCreateProjectMutation,
} = projectApi;

