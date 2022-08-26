import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { database } from '../../firebase/firebaseConfig';

export const fetchNewsItems = createAsyncThunk('newsItems/fetchNewsStatus', async () => {
	// const response = await fetch(`http://localhost:3001/news`);
	// const data = await response.json();
	// return data;
	const collectionRef = collection(database, 'news')
	const collectionQuery = query(collectionRef, orderBy('id', 'desc'));
	const data = await getDocs(collectionQuery);
	const newsData = data.docs.map((item) => {
		return {...item.data(), ID: item.id};
	});
	return newsData
});

const initialState = {
	news: [],
	newsStatus: 'loading',
};

const newsSlice = createSlice({
	name: 'newsItems',
	initialState,
	reducers: {
		setNews(state, action) {
			state.news = action.payload;
		},
	},
	extraReducers: {
		[fetchNewsItems.pending]: (state) => {
			state.newsStatus = 'loading';
			state.news = [];
		},
		[fetchNewsItems.fulfilled]: (state, action) => {
			state.newsStatus = 'success';
			state.news = action.payload;
		},
		[fetchNewsItems.rejected]: (state) => {
			state.newsStatus = 'error';
			state.news = [];
		},
	},
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
