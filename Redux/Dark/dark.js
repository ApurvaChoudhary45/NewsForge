import { createSlice } from '@reduxjs/toolkit'

export const dark = createSlice({
    name: 'darker',
    initialState: {
        mode: false
    },
    reducers: {
        toggleMode: state => {
            state.mode = !state.mode
        }
    }


})

// Action creators are generated for each case reducer function
export const { toggleMode } = dark.actions

export const darkReducer = dark.reducer