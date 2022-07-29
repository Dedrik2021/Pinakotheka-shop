import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useLocation } from 'react-router-dom';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { setUserInfoBtn } from '../../redux/slices/userSlice';
import img from '../../assets/images/content/unknow-photo.png';
import { realDb } from '../../firebase/firebaseConfig';
import UserInfo from '../components/UserInfo';

// import { fetchUserData } from '../../redux/slices/userSlice';
// import { setFoundUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
	const contentBtn = [
		{ id: 0, title: 'Persönliche Informationen' },
		{ id: 1, title: 'Benachrichtigungseinstellungen' },
		{ id: 2, title: 'Korrespondenzarchiv' },
		{ id: 3, title: 'Chat' },
	];

	const location = useLocation();
	const user = location.state;

	// const [foundUser, setFoundUser] = useState();
	// const [userDataEmail, setUserDataEmail] = useState();

	// const [loading, setLoading] = useState(true);

	// const auth = getAuth();
	// const user = auth.currentUser;
	const dispatch = useDispatch();
	const { userInfoBtn, userData } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	const getUserEmail = async () => {
		const userEmail = await location.state;
		return userEmail;
	};

	const getUser = (userEmail) => {
		const findUser = userData.find((item) => item.email === userEmail);
		console.log(findUser);
	};

	console.log(userData);

	useState(() => {
		getUserEmail().then(getUser);
	}, []);

	const showContent = () => {
		switch (userInfoBtn) {
			case 0:
				return <UserInfo user={user}/>
			case 1:
				return;
			case 2:
				return;
			case 3:
				return;
			default:
				return <UserInfo user={user}/>
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
					<div className='user-account__info'>
						{showContent()}
					</div>	
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
