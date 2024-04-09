import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { scoreBoardSlice } from '../slice/scoreBoardSlice'

const store = configureStore({
    reducer: combineReducers({
        scoreBoard: scoreBoardSlice.reducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store }