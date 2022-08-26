import React, { useState, useEffect } from 'react';
import { ref, update } from 'firebase/database';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { realDb } from '../../firebase/firebaseConfig';
import img from '../../assets/images/content/unknow-photo.png';
import Spinner from '../../spinner/Spinner';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';

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

	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const changeImg = userImg === '' ? userInfo.image : userImg;
	const emptyImg = userImg === '' ? img : userImg;

	useEffect(() => {
		setNameInput(userInfo.name);
		setEmailInput(userInfo.email);
		setCountryInput(userInfo.country);
		setTelInput(userInfo.tel);
		setNetworkInput(userInfo.faceBook);
		setCityInput(userInfo.city);
		setInstaInput(userInfo.instagram);
		setAddressInput(userInfo.addressStreet);
	}, []);

	const updateData = (e) => {
		e.preventDefault();
		const docToUpdates = ref(realDb, `usersIdentify/ ${userInfo.user}/ ${userInfo.id}`);
		update(docToUpdates, {
			name: nameInput,
			email: emailInput,
			tel: Number(telInput),
			faceBook: networkInput,
			instagram: instaInput,
			image: imageInput === '' ? userInfo.image : userImg,
			addressStreet: addressInput,
			city: cityInput,
			country: countryInput,
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
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Bearbeiten von Informationen' : 'Editing information'} />
				<title>{switchBtn ? 'Bearbeiten von Informationen' : 'Editing information'}</title>
			</Helmet>

			<div className="user-edit">
				<form className="user-edit__form" onSubmit={(e) => updateData(e)}>
					<div className="user-edit__content">
						<div className="user-edit__wrapper">
							<div className="user-edit__box">{onLoading()}</div>
							<div className="user-edit__wrapper user-edit__wrapper--btn">
								<label className="user-edit__label user-edit__label--img" htmlFor="user-photo">
									<input
										className="user-edit__input user-edit__input--img"
										type="file"
										id="user-photo"
										onChange={(e) => (
											setImageInput(e.target.value), setDataStorage(e.target.files[0])
										)}
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
								<span className='user-edit__star'>*</span>
								<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setNameInput('')}
								>
									{nameInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-name">
									Name
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-name"
									required
									value={nameInput}
									onChange={(e) => setNameInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<span className='user-edit__star'>*</span>
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setEmailInput('')}
								>
									{emailInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-email">
									Email
								</label>
								<input
									className="user-edit__input"
									type="email"
									id="user-email"
									required
									value={emailInput}
									onChange={(e) => setEmailInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<span className='user-edit__star'>*</span>
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setTelInput('')}
								>
									{telInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-tel">
									Phone
								</label>
								<input
									className="user-edit__input"
									type="tel"
									id="user-tel"
									required
									value={telInput}
									onChange={(e) => setTelInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setNetworkInput('')}
								>
									{networkInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-network">
									Network
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-network"
									value={networkInput}
									onChange={(e) => setNetworkInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setInstaInput('')}
								>
									{instaInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-insta">
									Instagram
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-insta"
									value={instaInput}
									onChange={(e) => setInstaInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setCountryInput('')}
								>
									{countryInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-country">
									Country
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-country"
									value={countryInput}
									onChange={(e) => setCountryInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setCityInput('')}
								>
									{cityInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-city">
									City
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-city"
									value={cityInput}
									onChange={(e) => setCityInput(e.target.value)}
								/>
							</li>
							<li className="user-edit__item">
							<button
									className="create-news__clean-btn btn"
									type="button"
									onClick={() => setAddressInput('')}
								>
									{addressInput ? (
										<>
											<span className="sr-only">
												{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
											</span>
											<svg width="20" height="20">
												<use href={`${CleanInputIcon}#clean-input`}></use>
											</svg>
										</>
									) : (
										<svg className="keyboard" width="20" height="20">
											<use href={`${Keyboard}#keyboard`}></use>
										</svg>
									)}
								</button>
								<label className="user-edit__label" htmlFor="user-address">
									Address
								</label>
								<input
									className="user-edit__input"
									type="text"
									id="user-address"
									value={addressInput}
									onChange={(e) => setAddressInput(e.target.value)}
								/>
							</li>
						</ul>
						<span className='user-edit__star user-edit__star--warning'>
							*
							<span>It is necessary to fill in the data field !</span>
						</span>
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
		</>
	);
};

export default EditUserInfo;
