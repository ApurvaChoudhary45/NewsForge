import { configureStore } from '@reduxjs/toolkit'
import { newSlicer } from './New/newSlice'
import { searchReducer } from './Search/search'
import { featureReducer } from './Featured/featured'
import { likeReducer } from './Liked/liked'
import { saveReducer } from './Saved/saved'
import { darkReducer } from './Dark/dark'

export const store =  configureStore({
  reducer: {
    reader: newSlicer,
    searcher: searchReducer,
    featuring : featureReducer,
    liking: likeReducer,
    saving: saveReducer,
    darker: darkReducer
  }
})