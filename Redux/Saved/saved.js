import { createSlice } from '@reduxjs/toolkit'

export const saved = createSlice({
    name: 'saving',
    initialState: {
        allsave: []
    },
    reducers: {
        savedPost: (state, action) => {
            const id = action.payload;
            if(state.allsave.includes(id)){
                state.allsave = state.allsave.filter(i=> i !== id)
            }
            else{
                state.allsave.push(id)
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { savedPost } = saved.actions

export const saveReducer = saved.reducer