import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: {},
    userTransactions: []
}

const walletSlice = createSlice({
    name: "brains",
    initialState,
    reducers:{
        login: (state) => {
            state.status = true
        },
        addUserData: (state, action) => {
            if(state.status === true){
                state.userData = action.payload
            }
        },
        addUserTransaction: (state, action) => {
            if(state.status === true){
                state.userTransactions = action.payload
            }
        },
        logout: (state, action) => {
            state.status = false,
            state.userData = {},
            state.userTransactions = {}
        }
    }
})

export const { login, addUserData, addUserTransaction, logout } = walletSlice.actions
export default walletSlice.reducer