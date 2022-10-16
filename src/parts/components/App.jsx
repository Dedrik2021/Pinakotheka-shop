import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';

import {
	Home,
	SinglePainting,
	Error404,
	MainLayout,
	AboutAuthor,
	News,
	SingleNews,
	Authors,
	UserAccount,
	UserCart,
	UserLikes,
	ForgottenPassword,
	CreateNews,
	EditNews,
	ReviewUserInfo
} from '../pages/indexPage';
import { database } from '../../firebase/firebaseConfig';
import { setGetAuthors } from '../../redux/slices/authorsInfosSlice';
import { setGetUsers, setShowUserInfo } from '../../redux/slices/userSlice';
import '../../scss/style.scss';

const App = () => {

	const dispatch = useDispatch()
	const authors = useSelector(state => state.authorsInfos.authors)
	const {users, showUserInfo} = useSelector(state => state.user)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0
	const collectionAuthorsRef = collection(database, 'authors')
	const collectionUsersrsRef = collection(database, 'users')
	const collectionUserInfoRef = collection(database, 'showUserInfo')
	
	const collectionAuthorsQuery = query(collectionAuthorsRef, orderBy('id', 'asc'));
	const collectionUsersQuery = query(collectionUsersrsRef, orderBy('id', 'asc'));

	useEffect(() => {
		getDocs(collectionAuthorsQuery).then((response) => {
			const data = response.docs.map((item) => {
				return { ...item.data(), ID: item.id };
			})
			dispatch(setGetAuthors(data))
		});
	}, [authors])

	useEffect(() => {
		getDocs(collectionUsersQuery).then((response) => {
			const data = response.docs.map((item) => {
				return { ...item.data(), ID: item.id };
			})
			dispatch(setGetUsers(data))
		});
	}, [users])

	useEffect(() => {
		getDocs(collectionUserInfoRef).then((response) => {
			const data = response.docs.map((item) => {
				return item.data();
			})
			dispatch(setShowUserInfo(data))
		});
	}, [showUserInfo])

	return (
		
		<Router>
			<Suspense>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="" element={<Home />} />
						<Route path={switchBtn ? '/Autoren' : '/Authors'} element={<Authors />} />
						<Route path={`${switchBtn ? '/Autor/' : '/Author/'}:id`} element={<AboutAuthor />} />
						<Route path={`${switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'}/:id`} element={<SinglePainting />} />
						<Route path={switchBtn ? '/Nachrichten' : '/News'} element={<News />} />
						<Route path={switchBtn ? '/Korb' : '/Cart'} element={<UserCart />} />
						<Route path={switchBtn ? '/PersonlichesBuro' : '/PersonalOffice'} element={<UserAccount />} />
						<Route path={switchBtn ? 'DieIhnenGefallen' : '/WhatYouLike'} element={<UserLikes />} />
						<Route path={switchBtn ? '/PasswortVergessen' : 'ForgotYourPassword'} element={<ForgottenPassword />} />
						<Route path={`${switchBtn ? '/Nachrichten/Nachricht/' : '/News/Newses/'}:id`} element={<SingleNews />} />
						<Route path={`${switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}`} element={<CreateNews />} />
						<Route path={`${switchBtn ? '/Nachrichten/NeuigkeitenBearbeiten/' : '/News/EditNews/'}:id`} element={<EditNews />} />
						<Route path={`${switchBtn ? '/BenutzerinformationenUberprufen/' : '/ReviewUserInformation/'}:id`} element={<ReviewUserInfo />} />
						<Route path="*" element={<Error404 />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
