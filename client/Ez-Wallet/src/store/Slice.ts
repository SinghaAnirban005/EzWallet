import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const walletSlice = createSlice({
    name: "brains",
    initialState,
    reducers:{
        login: (state) => {
            state.status = true
        }
    }
})

export const { login } = walletSlice.actions
export default walletSlice.reducer