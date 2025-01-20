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
        updateUserBalance: (state, action) => {
            if(state.status === true){
                //@ts-ignore
                state.userData.account.balance += parseInt(action.payload)
            }
        },
        addUserTransaction: (state, action) => {
            if(state.status === true){
                state.userTransactions = action.payload
            }
        },
        logout: (state) => {
            state.status = false,
            state.userData = {},
            state.userTransactions = []
        }
    }
})

export const { login, addUserData, addUserTransaction, updateUserBalance, logout } = walletSlice.actions
export default walletSlice.reducer