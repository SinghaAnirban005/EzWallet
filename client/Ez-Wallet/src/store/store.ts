import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./Slice"

const store = configureStore({
    reducer: walletSlice
})

export type RootState = ReturnType<typeof store.getState>
export default store