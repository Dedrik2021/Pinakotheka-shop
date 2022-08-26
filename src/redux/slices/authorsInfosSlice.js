import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { realDb, database } from "../../firebase/firebaseConfig";

export const fetchAuthorsData = createAsyncThunk('authorsData/fetchAuthorsStatus', async () => {
	const collectionRef = collection(database, 'authors')
	const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	const data = await getDocs(collectionQuery);
	const authorsData = data.docs.map((item) => {
		return {...item.data(), ID: item.id};
	});
	return authorsData
});


export const fetchSinglePainting = createAsyncThunk('fetchSinglePainting/fetchSinglePaintingStatus', async () => {
	const response = await fetch('http://localhost:3001/singlePainting');
	const data = await response.json();
	return data;
});

export const fetchAuthorsItems = createAsyncThunk('paintingsItems/fetchPaintingsStatus', async () => {
	const response = await fetch('http://localhost:3001/items');
	const data = await response.json();
	return data;
});

export const fetchAuthorInfo = createAsyncThunk('authorInfo/fetchAuthorStatus', async (params) => {
	const { authorId } = params;
	const response = await fetch(`http://localhost:3001/items/${authorId}`);
	const data = await response.json();
	return data;
});

export const changeSinglePainting = createAsyncThunk('singlePainting/changeSinglePaintingStatus', async ({findPainting}) => {
	const response = await fetch(`http://localhost:3001/singlePainting`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(findPainting),
	});
	if (!response.ok) {
		throw new Error('The singlePainting was not changed on server!!!');
	}
	const data = await response.json();
    return data
});

const initialState = {
	authors: [],
	authorsStatus: 'loading',
	switchModal: 0,
	modal: false,
	paintings: [],
	authorInfo: '',
    singlePainting: '',
	userDropdown: false,
    statusSinglePainting: 'loading',
	statusPaintings: 'loading',
	statusAuthorInfo: 'loading',
};

const authorsInfosSlice = createSlice({
	name: 'authorsInfos',
	initialState,
	reducers: {
		setSinglePainting(state, action) {
			state.singlePainting = action.payload;
		},
		setAuthorId(state, action) {
			state.authorId = action.payload;
		},
		setUserDropdown(state, action) {
			state.userDropdown = action.payload;
		},
		setSwitchModal(state, action) {
			state.switchModal = action.payload;
		},
		setModal(state, action) {
			state.modal = action.payload;
		},
	},
	extraReducers: {

		[fetchAuthorsItems.pending]: (state) => {
			state.statusPaintings = 'loading';
			state.paintings = [];
		},
		[fetchAuthorsItems.fulfilled]: (state, action) => {
			state.statusPaintings = 'success';
			state.paintings = action.payload;
		},
		[fetchAuthorsItems.rejected]: (state) => {
			state.statusPaintings = 'error';
			state.paintings = [];
		},

		[fetchAuthorInfo.pending]: (state) => {
			state.statusAuthorInfo = 'loading';
			state.authorInfo = '';
		},
		[fetchAuthorInfo.fulfilled]: (state, action) => {
			state.statusAuthorInfo = 'success';
			state.authorInfo = action.payload;
		},
		[fetchAuthorInfo.rejected]: (state) => {
			state.statusAuthorInfo = 'error';
			state.authorInfo = '';
		},

		[fetchSinglePainting.pending]: (state) => {
			state.statusSinglePainting = 'loading';
			state.singlePainting = '';
		},
		[fetchSinglePainting.fulfilled]: (state, action) => {
			state.statusSinglePainting = 'success';
			state.singlePainting = action.payload;
		},
		[fetchSinglePainting.rejected]: (state) => {
			state.statusSinglePainting = 'error';
			state.singlePainting = '';
		},

		extraReducers: {
			[fetchAuthorsData.pending]: (state) => {
				state.authorsStatus = 'loading';
				state.authors = [];
			},
			[fetchAuthorsData.fulfilled]: (state, action) => {
				state.authorsStatus = 'success';
				state.authors = action.payload;
			},
			[fetchAuthorsData.rejected]: (state) => {
				state.authorsStatus = 'error';
				state.authors = [];
			},
		},

		// [changeModal.pending]: (state) => {
		// 	state.statusSinglePainting = 'loading';
		// 	state.singlePainting = '';
		// },
		// [fetchSinglePainting.fulfilled]: (state, action) => {
		// 	state.statusSinglePainting = 'success';
		// 	state.singlePainting = action.payload;
		// },
		// [fetchSinglePainting.rejected]: (state) => {
		// 	state.statusSinglePainting = 'error';
		// 	state.singlePainting = '';
		// }
	},
});

export const { setSinglePainting, setAuthorId, setUserDropdown, setSwitchModal, setModal } = authorsInfosSlice.actions;
export default authorsInfosSlice.reducer;
