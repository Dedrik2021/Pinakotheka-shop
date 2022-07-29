import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, memo, useRef } from 'react';
import { v4 as uuiv4 } from 'uuid';
import { set, ref, update } from 'firebase/database';

import { realDb } from '../../firebase/firebaseConfig';
import Social from './Social';

const RegisterModal = memo(({ closeModal }) => {
	const [clientInput, setClientInput] = useState('');
	const [authorInput, setAuthorInput] = useState('');
	const [nameInput, setNameInput] = useState('');
	const [telInput, setTelInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [doublePasswordInput, setDoublePasswordInput] = useState('');
	const passwordReff = useRef()
	const auth = getAuth();

	const onRegister = (e) => {
		e.preventDefault();
		if (passwordInput == doublePasswordInput) {

			createUserWithEmailAndPassword(auth, emailInput, passwordInput)
				.then(addData)
				// .then(updateData)
				.then(() => {
					setAuthorInput('');
					setClientInput('');
					setPasswordInput('');
					setDoublePasswordInput('');
					setEmailInput('');
					setNameInput('');
					setTelInput('');
				})
				.then(closeModal(false))
				.catch(() => {
					alert('The email address already exists!');
				});
		} else {
			alert('Passwörter prüfen!');
			passwordReff.current.focus()
		}
	};

	const addData = () => {
		const ID = uuiv4();
		set(ref(realDb, `users/ ${ID}`), {
			id: ID,
			name: nameInput,
			email: emailInput,
			tel: Number(telInput),
			password: passwordInput,
			author: authorInput,
			client: clientInput,
			dateOfRegister: new Date().toLocaleString(),
			faceBook: '',
			instagram: '',
			photo: '',
			addressStreet: '',
			city: '',
			country: ''
		})
			.catch((err) => {
				console.log(err.message);
			});
	};

	// const updateData = () => {
	// 	const docToUpdates = ref(realDb, 'userData');
	// 	update(docToUpdates, {
	// 		email: emailInput,
	// 	})
	// 		.then(() => {
	// 			alert('Data updated in database');
	// 		})
	// 		.catch((err) => {
	// 			alert(err.message);
	// 		});
	// }

	return (
		<>
			<form className="modal-form" onSubmit={(e) => onRegister(e)}>
				<div className="modal-form__top">
					<div className="modal-form__wrapper">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="client"
							id="modal-user"
							value={clientInput}
							onChange={(e) => setClientInput(e.target.value)}
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="modal-user">
							Kunde
						</label>
					</div>
					<div className="modal-form__wrapper">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="author"
							id="autor"
							value={authorInput}
							onChange={(e) => setAuthorInput(e.target.value)}
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="autor">
							Autor
						</label>
					</div>
				</div>
				<label htmlFor="modal-name">
					<span className="sr-only">Name</span>
				</label>
				<input
					className="modal-form__input"
					type="text"
					placeholder="Name"
					name="name"
					id="modal-name"
					required
					value={nameInput}
					onChange={(e) => setNameInput(e.target.value)}
				/>

				<label htmlFor="modal-tel">
					<span className="sr-only">Telefon</span>
				</label>
				<input
					className="modal-form__input"
					type="tel"
					placeholder="Telefon"
					name="tel"
					id="modal-tel"
					required
					value={telInput}
					onChange={(e) => setTelInput(e.target.value)}
				/>
				<label htmlFor="modal-email2">
					<span className="sr-only">Email</span>
				</label>
				<input
					className="modal-form__input"
					type="email"
					placeholder="Email"
					name="email"
					id="modal-email2"
					required
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
				/>

				<label htmlFor="modal-password2">
					<span className="sr-only">Passwort</span>
				</label>
				<input
					className="modal-form__input"
					type="password"
					placeholder="Passwort"
					name="password"
					id="modal-password2"
					required
					value={passwordInput}
					onChange={(e) => setPasswordInput(e.target.value)}
				/>

				<label htmlFor="modal-repassword">
					<span className="sr-only">Passwort wiederholen</span>
				</label>
				<input
					className="modal-form__input"
					type="password"
					placeholder="Passwort wiederholen"
					name="password"
					id="modal-repassword"
					required
					ref={passwordReff}
					value={doublePasswordInput}
					onChange={(e) => setDoublePasswordInput(e.target.value)}
				/>

				<button className="modal-form__btn btn btn--red-hover" type="submit">
					Registrieren
				</button>

				<div className="modal-form__bottom">
					<div className="modal-form__wrapper-box">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="[register]checkbox"
							id="Agreement"
							required
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="Agreement">
							Ich stimme den <a href="#">Dienstordnungsvereinbarung</a> zu den Bedingungen und zu den in
							der <a href="#">Nutzungsvereinbarung</a> beschriebenen Zwecken zu
						</label>
					</div>
				</div>
			</form>
			{/* <button type="button" onClick={logOut}>
				Log out
			</button> */}
			{/* <button type='button' onClick={deleteData} >Delete data</button> */}
			<span className="modal__enter">Mit sozialen Netzwerken anmelden</span>
			<Social />
		</>
	);
});

export default RegisterModal;
