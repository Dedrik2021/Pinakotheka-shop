import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { ref, onValue, orderByKey, query } from "firebase/database";
import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";

import { database } from "../../firebase/firebaseConfig";
const auth = getAuth()

export const fetchUsersData = createAsyncThunk('usersData/fetchUsersStatus', async () => {
	// const response = await fetch(`http://localhost:3001/news`);
	// const data = await response.json();
	// return data;
	const collectionRef = collection(database, 'users')
	const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	const data = await getDocs(collectionQuery);
	const usersData = data.docs.map((item) => {
		return {...item.data(), ID: item.id};
	});
	return usersData
});

const initialState = {
    userInfoBtn: 0,
    foundUser: {},
    userData: [],
    userImg: '',
    users: [],
    clientUsers: [],
    authorUsers: [],
    dataUsers: [],
    showUserInfo: {},
    usersStatus: 'loading',
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
        setUserImg(state, action) {
            state.userImg = action.payload
        },
        setClientUsers(state, action) {
            state.clientUsers = action.payload
        },
        setAuthorUsers(state, action) {
            state.authorUsers = action.payload
        },
        setDataUsers(state, action) {
            state.dataUsers = action.payload
        },
        setShowUserInfo(state, action) {
            state.showUserInfo = action.payload
        },
        setGetUsers(state, action) {
            state.users = action.payload
        }
    },
    extraReducers: {
		[fetchUsersData.pending]: (state) => {
			state.usersStatus = 'loading';
			// state.users = [];
		},
		[fetchUsersData.fulfilled]: (state, action) => {
			state.usersStatus = 'success';
			// state.users = action.payload;
		},
		[fetchUsersData.rejected]: (state) => {
			state.usersStatus = 'error';
			// state.users = [];
		},
	},
})

export const {
    setUserInfoBtn, setFoundUser, setUserData, setUserImg, setAuthorUsers, setClientUsers, setDataUsers, setShowUserInfo, setGetUsers
} = userSlice.actions

export default userSlice.reducer
