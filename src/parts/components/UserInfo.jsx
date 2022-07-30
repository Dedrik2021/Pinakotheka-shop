import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import img from '../../assets/images/content/unknow-photo.png';

const UserInfo = memo(({user, setEditBtn }) => {

	const onEditBtn = () => {
		setEditBtn(true)
		window.scroll(0, 0)
	}

	console.log(user);

	return (
		<div className="user-account__info">
			<div className="user-account__content">
				<div className="user-account__img-wrapper">
					<img className="user-account__img" src={img} alt="" />
					<img className="user-account__img user-account__img--blur" src={img} alt="" />
				</div>
				<div className="user-info">
					<span className="user-info__item">
						Name: <span>{user.name}</span>
					</span>
					<span className="user-info__item">
						Email: <span>{user.email}</span>
					</span>
					<span className="user-info__item">
						Phone: <span>{user.tel}</span>
					</span>
					<span className="user-info__item">
						Network: <span>{user.faceBook}</span>
					</span>
					<span className="user-info__item">
						Instagram: <span>{user.instagram}</span>
					</span>
					<span className="user-info__item">
						Country: <span>{user.country}</span>
					</span>
					<span className="user-info__item">
						City: <span>{user.city}</span>
					</span>
					<span className="user-info__item">
						Address: <span>{user.addressStreet}</span>
					</span>
				</div>
			</div>
			<button type='button' className="user-account__btn-edit btn btn--universal " onClick={onEditBtn}
            >
				Profil bearbeiten
			</button>
		</div>
	);
});
export default UserInfo;
