import { createSlice } from '@reduxjs/toolkit'

export const featured = createSlice({
    name: 'featuring',
    initialState: {
        feature: 'news'
    },
    reducers: {
        featuredPost: (state, action) => {
            state.feature = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { featuredPost } = featured.actions

export const featureReducer = featured.reducer