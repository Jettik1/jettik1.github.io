import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getPostById: builder.query({
            query: (id) => `posts/${id}`,

        }),
        getPosts: builder.query({
            query: (pageNumber) => `posts?_page=${pageNumber}&_limit=15`,
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    })
})

export const {useGetPostByIdQuery, useGetPostsQuery} = postApi