import React from 'react';

import img from '../../assets/images/content/unknow-photo.png';

const UserInfo = ({user}) => {
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
						Network: <span>{user.netWork}</span>
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
						Address: <span>{user.address}</span>
					</span>
				</div>
			</div>
			<button className="user-account__btn-edit btn btn--universal " type="button">
				Profil bearbeiten
			</button>
		</div>
	);
};

export default UserInfo;
