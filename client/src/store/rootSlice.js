import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({

    name:"root",

    initialState: {
        FormStage: 1, // default page stage to show on page load
        FormUserSignup: "",
        FormUserProfile: ""
    },

    reducers: {
        formStage: (state, action) => { state.FormStage = action.payload },
        formSignup: (state, action) => { state.FormUserSignup = action.payload },
        formProfile: (state, action) => { state.FormUserProfile = action.payload }
    }
})

export const { formStage, formSignup, formProfile } = rootSlice.actions
export const reducer = rootSlice.reducer;