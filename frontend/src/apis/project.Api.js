import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseURL'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({

    addProject: builder.mutation({
      query: (projectData) => ({
        url: '/addProject',
        method: 'POST',
        body: projectData
      }),
      invalidatesTags: ['Project']
    }),

    getAllProject: builder.query({
      query: () => ({
        url: '/getAllProject',
        method: 'GET',
      }),
      providesTags: ['Project']
    }),

    getProject: builder.query({
      query: (id) => ({
        url: `/getProject/${id}`,
        method: 'GET',
      }),
      providesTags: ['Project']
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/getProjectById/${id}`,
        method: 'GET'
      }),
      providesTags: ['Project']
    }),

    searchProject: builder.query({
      query: (title) => ({
        url: `/searchProject`,
        params: { title },
        method: 'GET'
      }),
      providesTags: ['Project']
    }),

    searchUsersProject: builder.query({
      query: (title) => ({
        url: `/searchUsersProject?title=${title}`,
        method: 'GET',
      }),
      providesTags: ['Project'],
    }),

    updateProject: builder.mutation({
      query: ({ id, ...projectData }) => ({
        url: `/updateProject/${id}`,
        method: 'PUT',
        body: projectData
      }),
      invalidatesTags: ['Project']
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/deleteProject/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project']
    }),

    updateSetting: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateSetting/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Project']
    })
  })
})

export const { useAddProjectMutation, useGetProjectQuery, useSearchProjectQuery, useGetProjectByIdQuery, useUpdateProjectMutation, useDeleteProjectMutation, useUpdateSettingMutation, useSearchUsersProjectQuery, useGetAllProjectQuery } = projectApi;