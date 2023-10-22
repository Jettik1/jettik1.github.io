import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getPostById: builder.query({
            query: (id) => `posts/${id}`,

        }),
        getPosts: builder.query({
            query: () => `posts`,
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