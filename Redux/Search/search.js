import { createSlice } from '@reduxjs/toolkit'

export const search = createSlice({
    name: 'searcher',
    initialState: {
        search: 'news'
    },
    reducers: {
        searchPost: (state, action) => {
            state.search = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { searchPost } = search.actions

export const searchReducer = search.reducer