import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    breadCrumbsTitle: '',
}

const breadCrumbsSlice = createSlice({
    name: 'breadCrumbs',
    initialState,
    reducers: {
        setBreadCrumbs(state, action) {
            state.breadCrumbsTitle = action.payload
        }
    }
})

export const {setBreadCrumbs, setBreadCrumbsId} = breadCrumbsSlice.actions
export default breadCrumbsSlice.reducer