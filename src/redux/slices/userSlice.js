import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

import { realDb } from "../../firebase/firebaseConfig";
const auth = getAuth()

// export const fetchUserData = createAsyncThunk('userData/fetchUser', async () => {

//     onAuthStateChanged(auth, (snapshot) => {
//         if (snapshot) {
//             onValue(ref(realDb, 'users'), (snapshot) => {
//                 if (snapshot.exists()) {
//                     return Object.values(snapshot.val());
//                 } 
//             });
//         }
//     })
	
// 	// const collectionRef = collection(database, 'news')
// 	// const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
// 	// const data = await getDocs(collectionQuery);
// 	// const newsData = data.docs.map((item) => {
// 	// 	return item.data();
// 	// });
// 	// return newsData
// });

const initialState = {
    userInfoBtn: 0,
    foundUser: {},
    userData: [],
    userEmail: ''
    // users: [],
    // usersStatus: 'loading'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfoBtn(state, action) {
            state.userInfoBtn = action.payload
        },
        setFoundUser(state, action) {
            state.foundUser = action.payload
        },
        setUserData(state, action) {
            state.userData = action.payload
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload
        }
    },
    // extraReducers: {
	// 	[fetchUserData.pending]: (state) => {
	// 		state.usersStatus = 'loading';
	// 		state.users = [];
	// 	},
	// 	[fetchUserData.fulfilled]: (state, action) => {
	// 		state.usersStatus = 'success';
	// 		state.users = action.payload;
	// 	},
	// 	[fetchUserData.rejected]: (state) => {
	// 		state.usersStatus = 'error';
	// 		state.users = [];
	// 	},
	// },
})

export const {
    setUserInfoBtn, setFoundUser, setUserData, setUserEmail
} = userSlice.actions

export default userSlice.reducer
