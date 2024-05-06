import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { temporaryScoreSlice } from '../slice/temporaryScoreSlice'

const store = configureStore({
    reducer: combineReducers({
        temporaryScore: temporaryScoreSlice.reducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store }