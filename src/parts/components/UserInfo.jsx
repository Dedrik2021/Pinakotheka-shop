import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import img from '../../assets/images/content/unknow-photo.png';
import Spinner from '../../spinner/Spinner';
import EditIcon from '../../assets/images/sprite/edit-icon.svg';
import UserInfoSkeleton from '../../skeletons/userInfoSkeleton';
import MessageIcon from '../../assets/images/sprite/message-icon.svg'
import { setModal } from '../../redux/slices/authorsInfosSlice';

const UserInfo = memo(({ user, setEditBtn }) => {
	const auth = getAuth();
	const dispatch = useDispatch()
	// const fakeUser = user.find(item => item.emailId != auth.currentUser.email)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const onEditBtn = () => {
		setEditBtn(true);
		window.scroll(0, 0);
	};

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const showEditBtn = () => {
		if (user.emailId === auth.currentUser.email) {
			return (
				<button type="button" className="user-account__btn-edit btn btn--universal " onClick={onEditBtn}>
					{switchBtn ? 'Profil bearbeiten' : 'Edit Profile'}
					<svg width="15" height="15">
						<use href={`${EditIcon}#edit`}></use>
					</svg>
				</button>
			);
		} else {
			return (
				<button type="button" className="user-account__btn-edit btn btn--universal " onClick={() => dispatch(setModal(true))}>
					{switchBtn ? 'Schreiben Sie eine Nachricht' : 'Write a message'}
					<svg width="20" height="20">
						<use href={`${MessageIcon}#message`}></use>
					</svg>
				</button>
			);
		}
	};

	// const city =
	// 	user.city != '' ? (
	// 		<span className="user-info__item">
	// 			City: <span>{user.city}</span>
	// 		</span>
	// 	) : null;

	// const insta =
	// 	user.instagram != '' ? (
	// 		<span className="user-info__item">
	// 			Instagram: <span>{user.instagram}</span>
	// 		</span>
	// 	) : null;

	// const facebook =
	// 	user.faceBook != '' ? (
	// 		<span className="user-info__item">
	// 			Network: <span>{user.faceBook}</span>
	// 		</span>
	// 	) : null;

	// const country =
	// 	user.country != '' ? (
	// 		<span className="user-info__item">
	// 			Country: <span>{user.country}</span>
	// 		</span>
	// 	) : null;

	// const address =
	// 	user.addressStreet != '' ? (
	// 		<span className="user-info__item">
	// 			Address: <span>{user.addressStreet}</span>
	// 		</span>
	// 	) : null;

	return (
		<>
			<Helmet>
				<meta name="description" content="Benutzerinformationen" />
				<title>Benutzerinformationen</title>
			</Helmet>
			{user != undefined ? (
				<div className="user-account__info user-account__info--wrapper">
					<div className="user-account__content">
						<div className="user-account__box-wrapper">
							<div className="user-account__img-wrapper">

							<img
								className="user-account__img"
								src={user.image === '' ? img : user.image}
								alt={user.name}
							/>
							<img
								className="user-account__img user-account__img--blur"
								src={user.image === '' ? img : user.image}
								alt={user.name}
							/>
							</div>
							{showEditBtn()}
						</div>

						<div className="user-info">
							<span className="user-info__item">
								Name: <span>{user.name}</span>
							</span>
							<span className="user-info__item">
								Phone: <span>{user.tel}</span>
							</span>
							<span className="user-info__item">
								Instagram: <span>{user.instagram != '' ? user.instagram : '#######.###'}</span>
							</span>
							{/* {city} */}
							<span className="user-info__item">
								City: <span>{user.city != '' ? user.city : '########'}</span>
							</span>
							<span className="user-info__item">
								Email: <span>{user.email}</span>
							</span>
							{/* {insta}
							{facebook}
							{country}
							{address} */}
							<span className="user-info__item">
								Network: <span>{user.faceBook != '' ? user.faceBook : '#######.###'}</span>
							</span>
							<span className="user-info__item">
								Country: <span>{user.country != '' ? user.country : '########'}</span>
							</span>
							<span className="user-info__item">
								Address:{' '}
								<span>{user.addressStreet != '' ? user.addressStreet : '##### ##### #####'}</span>
							</span>
						</div>
					</div>

					{/* <button type="button" className="user-account__btn-edit btn btn--universal " onClick={onEditBtn}>
						{switchBtn ? 'Profil bearbeiten' : 'Edit Profile'}
						<svg width="15" height="15">
							<use href={`${EditIcon}#edit`}></use>
						</svg>
					</button> */}
					{/* {showEditBtn()} */}
				</div>
			) : (
				<>
					<UserInfoSkeleton />
				</>
			)}
		</>
	);
});
export default UserInfo;
