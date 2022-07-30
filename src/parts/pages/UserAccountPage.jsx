import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { ref, onValue } from 'firebase/database';
import { useLocation } from 'react-router-dom';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { setUserInfoBtn } from '../../redux/slices/userSlice';
// import img from '../../assets/images/content/unknow-photo.png';
// import { realDb } from '../../firebase/firebaseConfig';
import UserInfo from '../components/UserInfo';
import EditUserInfo from '../components/EditUserInfo';
import { getAuth } from 'firebase/auth';

// import { fetchUserData } from '../../redux/slices/userSlice';
// import { setFoundUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
	const contentBtn = [
		{ id: 0, title: 'Persönliche Informationen' },
		{ id: 1, title: 'Benachrichtigungseinstellungen' },
		{ id: 2, title: 'Korrespondenzarchiv' },
		{ id: 3, title: 'Chat' },
	];

	const [editBtn, setEditBtn] = useState(false)
	const auth = getAuth()
	const userId = auth.currentUser
	const dispatch = useDispatch();
	const data = useSelector(state => state.user.userData)
	const userInfoBtn = useSelector((state) => state.user.userInfoBtn);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);
	
	const showContent = () => {
		if (userId != null) {
			const user = data.find((item) => item.emailId === userId.email)
			switch (userInfoBtn) {
				case 0:
					return editBtn ? <EditUserInfo setEditBtn={setEditBtn} userInfo={user}/> :
						<UserInfo user={user} setEditBtn={setEditBtn}/>
				case 1:
					return;
				case 2:
					return;
				case 3:
					return;
				default:
					return <UserInfo user={user}/>
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
					<div className='user-account__info'>
						{showContent()}
					</div>	
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
