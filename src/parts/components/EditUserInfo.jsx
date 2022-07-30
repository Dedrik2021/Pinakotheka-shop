import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { set, ref, update } from 'firebase/database';

import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { realDb } from '../../firebase/firebaseConfig';

const EditUserInfo = ({ setEditBtn, userInfo }) => {
	// const dispatch = useDispatch();
	
	// useEffect(() => {
	// 	dispatch(setBreadCrumbs(''));
	// 	const pathName = window.location.pathname.substring(1, 20);
	// 	const name = pathName.split('/');
	// 	dispatch(setBreadCrumbs(name));

	const [networkInput, setNetworkInput] = useState('');
	const [countryInput, setCountryInput] = useState('');
	const [addressInput, setAddressInput] = useState('');
	const [nameInput, setNameInput] = useState('');
	const [telInput, setTelInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [cityInput, setCityInput] = useState('');
	const [instaInput, setInstaInput] = useState('');
	const [photoInput, setPhotoInput] = useState('');
	// }, []);

	const updateData = (e) => {
		e.preventDefault()
		const docToUpdates = ref(realDb, `users/ ${userInfo.id}`);
		update(docToUpdates, {
			name: nameInput === '' ? userInfo.name : nameInput,
			email: emailInput === '' ? userInfo.email : emailInput,
			tel: telInput === '' ? userInfo.tel : Number(telInput),
			faceBook: networkInput === '' ? userInfo.faceBook : networkInput,
			instagram: instaInput === '' ? userInfo.instagram : instaInput,
			photo: photoInput === '' ? userInfo.photo : photoInput,
			addressStreet: addressInput === '' ? userInfo.addressStreet : addressInput,
			city: cityInput === '' ? userInfo.city : cityInput,
			country: countryInput === '' ? userInfo.country : countryInput
		})
			.then(() => {
				alert('Data updated in database');
				setEditBtn(false)
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	return (
		<div className="container">
			<form className="user-edit" onSubmit={(e) => updateData(e)}>
				<ul className='user-edit__list'>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-photo">
							Photo
						</label>
						<input 
							className="user-edit__input" 
							type="file" 
							id="user-photo" 
							onChange={(e) => setPhotoInput(e.target.value)}
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-name">
							Name
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id="user-name" 
							value={nameInput}
							placeholder={userInfo.name} 
							onChange={e => setNameInput(e.target.value)}
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-email">
							Email
						</label>
						<input 
							className="user-edit__input" 
							type="email" 
							id="user-email" 
							value={emailInput} 
							placeholder={userInfo.email}
							onChange={e => setEmailInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-tel">
							Phone
						</label>
						<input 
							className="user-edit__input" 
							type="tel" 
							id="user-tel" 
							value={telInput}
							placeholder={userInfo.tel} 
							onChange={e => setTelInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-network">
							Network
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id="user-network" 
							value={networkInput}
							placeholder={userInfo.faceBook} 
							onChange={e => setNetworkInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-insta">
							Instagram
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id="user-insta" 
							value={instaInput}
							placeholder={userInfo.instagram} 
							onChange={e => setInstaInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-country">
							Country
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id='user-country'
							value={countryInput}
							placeholder={userInfo.country} 
							onChange={e => setCountryInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-city">
							City
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id="user-city" 
							value={cityInput}
							placeholder={userInfo.city} 
							onChange={e => setCityInput(e.target.value)}	
							/>
					</li>
					<li className='user-edit__item'>
						<label className="user-edit__label" htmlFor="user-address">
							Address
						</label>
						<input 
							className="user-edit__input" 
							type="text" 
							id="user-address" 
							value={addressInput}
							placeholder={userInfo.addressStreet} 
							onChange={e => setAddressInput(e.target.value)}	
							/>
					</li>
				</ul>
				<button
					className="user-edit__btn btn btn--red btn--universal"
					type="submit"
					// onClick={() => setEditBtn(false)}
				>
					Speichern
				</button>
			</form>
		</div>
	);
};

export default EditUserInfo;
