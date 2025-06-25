import { createSlice } from '@reduxjs/toolkit'

export const liked = createSlice({
    name: 'liking',
    initialState: {
        allLike: []
    },
    reducers: {
        likedPost: (state, action) => {
            const id = action.payload;
            if(state.allLike.includes(id)){
                state.allLike = state.allLike.filter(i=> i !== id)
            }
            else{
                state.allLike.push(id)
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { likedPost } = liked.actions

export const likeReducer = liked.reducer