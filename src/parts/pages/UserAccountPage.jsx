import React, { useEffect, useState } from 'react';
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
import EditUserInfo from '../components/EditUserInfo';
import { storage } from '../../firebase/firebaseConfig';

// import { fetchUserData } from '../../redux/slices/userSlice';
// import { setFoundUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
	const contentBtn = [
		{ id: 0, title: 'Persönliche Informationen' },
		{ id: 1, title: 'Benachrichtigungseinstellungen' },
		{ id: 2, title: 'Korrespondenzarchiv' },
		{ id: 3, title: 'Chat' },
	];

	const [dataStorage, setDataStorage] = useState({});
	const [loading, setLoading] = useState(false);
	const [userImg, setUserImg] = useState();

	const [editBtn, setEditBtn] = useState(false);
	const auth = getAuth();
	const userId = auth.currentUser;
	const dispatch = useDispatch();
	const data = useSelector((state) => state.user.userData);
	const {userInfoBtn, } = useSelector((state) => state.user);

	const user = data.find((item) => item.emailId === userId.email);

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
				setLoading(true)
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					setUserImg(downloadURL);
					if (downloadURL) {
						setLoading(false)
					}
				});
			},
		);
	};

	const showContent = () => {
		if (userId != null) {
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
						/>
					) : (
						<UserInfo loading={loading} user={user} setEditBtn={setEditBtn} />
					);
				case 1:
					return;
				case 2:
					return;
				case 3:
					return;
				default:
					return <UserInfo user={user} />;
			}
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className="user-account">
				<div className="user-account__inner">
					<div className="user-account__aside">
						<ul className="btns">
							{contentBtn.map(({ id, title }) => {
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
							})}
						</ul>
					</div>
					<div className="user-account__info">{showContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
