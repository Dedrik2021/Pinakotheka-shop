import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import img from '../../assets/images/content/unknow-photo.png';
import Spinner from '../../spinner/Spinner';
import EditIcon from '../../assets/images/sprite/edit-icon.svg'

const UserInfo = memo(({ user, setEditBtn, loading }) => {
	const onEditBtn = () => {
		setEditBtn(true);
		window.scroll(0, 0);
	};

	return (
		<div className="user-account__info">
			<div className="user-account__content">
				<div className="user-account__img-wrapper">
					{
						(loading ? (
							<Spinner />
						) : (
							<>
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
							</>
						))
					}
				</div>

				<div className="user-info">
					<span className="user-info__item">
						Name: <span>{user.name != '' ? user.name : '#### #####'}</span>
					</span>
					<span className="user-info__item">
						Phone: <span>{user.tel != '' ? user.tel : '+#(###) ### ### ###'}</span>
					</span>
					<span className="user-info__item">
						Instagram: <span>{user.instagram != '' ? user.instagram : '#######.###'}</span>
					</span>
					<span className="user-info__item">
						City: <span>{user.city != '' ? user.city : '########'}</span>
					</span>
					<span className="user-info__item">
						Email: <span>{user.email != '' ? user.email : '#######@####.###'}</span>
					</span>
					<span className="user-info__item">
						Network: <span>{user.faceBook != '' ? user.faceBook : '#######.###'}</span>
					</span>
					<span className="user-info__item">
						Country: <span>{user.country != '' ? user.country : '########'}</span>
					</span>
					<span className="user-info__item">
						Address: <span>{user.addressStreet != '' ? user.addressStreet : '##### ##### #####'}</span>
					</span>
				</div>
			</div>
			<button type="button" className="user-account__btn-edit btn btn--universal " onClick={onEditBtn}>
				Profil bearbeiten
				<svg width="15" height="15">
					<use href={`${EditIcon}#edit`}></use>
				</svg>
			</button>
		</div>
	);
});
export default UserInfo;
