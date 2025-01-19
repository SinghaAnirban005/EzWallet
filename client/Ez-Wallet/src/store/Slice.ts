import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: {}
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
                console.log(action.payload)
                state.userData = action.payload
            }
        },
        logout: (state, action) => {
            state.status = false,
            state.userData = {}
        }
    }
})

export const { login, addUserData, logout } = walletSlice.actions
export default walletSlice.reducer