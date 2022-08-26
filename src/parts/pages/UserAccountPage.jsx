import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { ref, onValue } from 'firebase/database';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { useLocation } from 'react-router-dom';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore/lite';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { setUserInfoBtn } from '../../redux/slices/userSlice';
// import img from '../../assets/images/content/unknow-photo.png';
// import { realDb } from '../../firebase/firebaseConfig';
import UserInfo from '../components/UserInfo';
import UserNotificationSettings from '../components/UserNotificationSettings';
import UserChatArchive from '../components/UserChatArchive';
import UserChat from '../components/UserChat';
import EditUserInfo from '../components/EditUserInfo';
import { storage } from '../../firebase/firebaseConfig';
import { setUserImg } from '../../redux/slices/userSlice';

// import { fetchUserData } from '../../redux/slices/userSlice';
// import { setFoundUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
	const [dataStorage, setDataStorage] = useState({});
	const [loading, setLoading] = useState(false);
	// const [userImg, setUserImg] = useState([]);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [editBtn, setEditBtn] = useState(false);
	// const [userChanged, setUserChanged] = useState({});
	const auth = getAuth();
	const userId = auth.currentUser;
	// const location = useLocation();
	// const changeUser = location.state

	const dispatch = useDispatch();
	const data = useSelector((state) => state.user.users);
	const { userInfoBtn, userImg, userChanged } = useSelector((state) => state.user);

	const user = data.find((item) => item.emailId === userId.email);
	const userFromReview = data.find((item) => item.emailId === userChanged.email);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const contentBtn = [
		{ id: 0, title: switchBtn ? 'Persönliche Informationen' : 'Personal Information' },
		{ id: 1, title: switchBtn ? 'Benachrichtigungseinstellungen' : 'Notification settings' },
		{ id: 2, title: switchBtn ? 'Chat Archiv' : 'Chat Archive' },
		{ id: 3, title: 'Chat' },
	];

	const userContentBtn = [
		{ id: 0, title: switchBtn ? 'Informationen' : ' Information' },
		{ id: 1, title: switchBtn ? 'seinstellungen' : 'Notification' },
		{ id: 2, title: 'Chat' },
	]

	// useEffect(() => {
	// 	for (const item in changeUser) {
	// 		if (Object.hasOwnProperty.call(changeUser, item)) {
	// 			const element = changeUser[item];
	// 			setUserChanged(element);
	// 		}
	// 	}
	// }, [changeUser]);

	// console.log(changeUser);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	const onStorage = () => {
		const storageRef = ref(storage, `images/${user.name}/${dataStorage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, dataStorage);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setLoading(true);
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);
				setLoadingProgress(progress);
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					let img = [];
					if (downloadURL) {
						setTimeout(() => {
							img.push(downloadURL);
							dispatch(setUserImg(img[0]));
							setLoading(false);
						}, 0);
					}
				});
			},
		);
	};

	// console.log(isPending);
	// console.log(userFromReview);
	// console.log(userChanged);
	// console.log(changeUser);

	const showContent = () => {
		if (userId != null && user != undefined ? user.emailId === userChanged.email : null) {
			switch (userInfoBtn) {
				case 0:
					return editBtn ? (
						<EditUserInfo
							onStorage={onStorage}
							setDataStorage={setDataStorage}
							setEditBtn={setEditBtn}
							userInfo={user}
							userImg={userImg}
							loading={loading}
							loadingProgress={loadingProgress}
						/>
					) : (
						<UserInfo loading={loading} user={user} setEditBtn={setEditBtn} />
					);
				case 1:
					return <UserNotificationSettings />;
				case 2:
					return <UserChatArchive />;
				case 3:
					return <UserChat />;
				default:
					return <UserInfo user={user} />;
			}
		} else {
			switch (userInfoBtn) {
				case 0:
					return editBtn ? (
						<EditUserInfo
							onStorage={onStorage}
							setDataStorage={setDataStorage}
							setEditBtn={setEditBtn}
							userInfo={user}
							userImg={userImg}
							loading={loading}
							loadingProgress={loadingProgress}
						/>
					) : (
						<UserInfo loading={loading} user={userFromReview} setEditBtn={setEditBtn} />
					);
				case 1:
					return <UserNotificationSettings />;
				case 2:
					return <UserChat />;
				default:
					return <UserInfo user={userFromReview} />;
			}
		}
	};

	const showBtns = () => {
		if (
			userId != null && 
			user != undefined ? 
			user.emailId === userChanged.email : null
			) {
			return contentBtn.map(({ id, title }) => {
				return (
					<li className="btns__item" key={id}>
						<button
							className={`btns__btn btn btn--red btn--universal 
						${userInfoBtn === id ? 'btn--active' : ''}`}
							onClick={() => dispatch(setUserInfoBtn(id))}
						>
							{title}
						</button>
					</li>
				);
			})
		} else {
			return userContentBtn.map(({ id, title }) => {
				return (
					<li className="btns__item" key={id}>
						<button
							className={`btns__btn btn btn--red btn--universal 
						${userInfoBtn === id ? 'btn--active' : ''}`}
							onClick={() => dispatch(setUserInfoBtn(id))}
						>
							{title}
						</button>
					</li>
				);
			})
		}
	}

	return (
		<div className="container">
			<BreadCrumbs />
			<div className="user-account">
				<div className="user-account__inner">
					<div className="user-account__aside">
						<ul className="btns">
							{showBtns()}
						</ul>
					</div>
					<div className="user-account__info">{showContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
