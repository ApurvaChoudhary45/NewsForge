import { createSlice } from '@reduxjs/toolkit'

export const newSlice = createSlice({
  name: 'reader',
  initialState: {
    cards: []
  },
  reducers: {

    getPosts: (state, action) => {
      state.cards = action.payload
    },
    getNewPosts : (state, action) =>{
      state.cards = [...state.cards, ...action.payload]
    }
  }
})

// Action creators are generated for each case reducer function
export const { getPosts, getNewPosts } = newSlice.actions

export const newSlicer =  newSlice.reducer