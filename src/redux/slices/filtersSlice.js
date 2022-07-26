import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authorInfoBtn: 0,
    switchLanguageBtn: 0
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setAuthorInfoBtn(state, action) {
            state.authorInfoBtn = action.payload
        },
        setSwitchLanguageBtn(state, action) {
            state.switchLanguageBtn = action.payload
        },
    }
})

export const {
    setAuthorInfoBtn,
    setSwitchLanguageBtn
} = filtersSlice.actions
export default filtersSlice.reducer