import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseURL.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({


    userSignup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

    userlogin: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

    usersignout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),

    googleSign: builder.mutation({
      query: (userData) => ({
        url: '/google',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    }),

    githubSign: builder.mutation({
      query: (userData) => ({
        url: '/google',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User']
    })

  })
})

export const { useUserSignupMutation, useUserloginMutation, useUsersignoutMutation, useGoogleSignMutation, useGithubSignMutation } = authApi;