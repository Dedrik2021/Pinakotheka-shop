import React, { useState } from 'react';
import { ref, update } from 'firebase/database';

import { realDb } from '../../firebase/firebaseConfig';
import img from '../../assets/images/content/unknow-photo.png';
import Spinner from '../../spinner/Spinner';
import { useSelector } from 'react-redux';

const EditUserInfo = (props) => {
	const { setEditBtn, userInfo, setDataStorage, onStorage, loading, userImg } = props;

	const [networkInput, setNetworkInput] = useState('');
	const [countryInput, setCountryInput] = useState('');
	const [addressInput, setAddressInput] = useState('');
	const [nameInput, setNameInput] = useState('');
	const [telInput, setTelInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [cityInput, setCityInput] = useState('');
	const [instaInput, setInstaInput] = useState('');
	const [imageInput, setImageInput] = useState('');

	const changeImg = userImg === undefined ? userInfo.image : userImg;
	const emptyImg = userImg === undefined ? img : userImg

	const updateData = (e) => {
		e.preventDefault();
		const docToUpdates = ref(realDb, `users/ ${userInfo.id}`);
		update(docToUpdates, {
			name: nameInput === '' ? userInfo.name : nameInput,
			email: emailInput === '' ? userInfo.email : emailInput,
			tel: telInput === '' ? userInfo.tel : Number(telInput),
			faceBook: networkInput === '' ? userInfo.faceBook : networkInput,
			instagram: instaInput === '' ? userInfo.instagram : instaInput,
			image: imageInput === '' ? userInfo.image : userImg,
			addressStreet: addressInput === '' ? userInfo.addressStreet : addressInput,
			city: cityInput === '' ? userInfo.city : cityInput,
			country: countryInput === '' ? userInfo.country : countryInput,
		})
			.then(setEditBtn(false))
			.catch((err) => {
				alert(err.message);
			});
	};

	const onLoading = () => {
		if (loading) {
			return <Spinner />;
		} else {
			return (
				<>
					<img
						className="user-edit__img"
						src={userInfo.image === '' ? emptyImg : changeImg}
						alt={userInfo.name}
						width={290}
						height={400}
					/>
					<img
						className="user-edit__img user-edit__img--blur"
						src={userInfo.image === '' ? emptyImg : changeImg}
						alt={userInfo.name}
						width={290}
						height={400}
					/>
				</>
			);
		}
	};

	return (
		<div className="user-edit">
			<form className="user-edit__form" onSubmit={(e) => updateData(e)}>
				<div className="user-edit__content">
					<div className="user-edit__wrapper">
						<div className="user-edit__box">
							{onLoading()}
						</div>
						<div className="user-edit__wrapper user-edit__wrapper--btn">
							<label className="user-edit__label user-edit__label--img" htmlFor="user-photo">
								<input
									className="user-edit__input user-edit__input--img"
									type="file"
									id="user-photo"
									placeholder={userInfo.image}
									onChange={(e) => (setImageInput(e.target.value), setDataStorage(e.target.files[0]))}
								/>
								<div className="user-edit__img-btn btn btn--red btn--universal">Add photo</div>
							</label>
							<button
								className="user-edit__btn user-edit__btn--save btn btn--universal"
								type="button"
								onClick={onStorage}
							>
								Save
							</button>
						</div>
					</div>
					<ul className="user-edit__list">
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-name">
								Name
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-name"
								value={nameInput}
								placeholder={userInfo.name}
								onChange={(e) => setNameInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-email">
								Email
							</label>
							<input
								className="user-edit__input"
								type="email"
								id="user-email"
								value={emailInput}
								placeholder={userInfo.email}
								onChange={(e) => setEmailInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-tel">
								Phone
							</label>
							<input
								className="user-edit__input"
								type="tel"
								id="user-tel"
								value={telInput}
								placeholder={userInfo.tel}
								onChange={(e) => setTelInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-network">
								Network
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-network"
								value={networkInput}
								placeholder={userInfo.faceBook}
								onChange={(e) => setNetworkInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-insta">
								Instagram
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-insta"
								value={instaInput}
								placeholder={userInfo.instagram}
								onChange={(e) => setInstaInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-country">
								Country
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-country"
								value={countryInput}
								placeholder={userInfo.country}
								onChange={(e) => setCountryInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-city">
								City
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-city"
								value={cityInput}
								placeholder={userInfo.city}
								onChange={(e) => setCityInput(e.target.value)}
							/>
						</li>
						<li className="user-edit__item">
							<label className="user-edit__label" htmlFor="user-address">
								Address
							</label>
							<input
								className="user-edit__input"
								type="text"
								id="user-address"
								value={addressInput}
								placeholder={userInfo.addressStreet}
								onChange={(e) => setAddressInput(e.target.value)}
							/>
						</li>
					</ul>
				</div>
				<div className="user-edit__box-btn">
					<button
						className="user-edit__btn btn btn--red btn--universal"
						onClick={() => setEditBtn(false)}
						type="button"
					>
						Cancel
					</button>
					<button className="user-edit__btn user-edit__btn--save btn--universal" type="submit">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditUserInfo;
