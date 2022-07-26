import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { memo, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Social from './Social';
import { setSwitchModal } from '../../redux/slices/authorsInfosSlice';

const SignInModal = memo(({ closeModal }) => {
	const auth = getAuth();
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [client, setClient] = useState('');
	const [author, setAuthor] = useState('');
	// const [trying, setTrying] = useState(0);
	const dispatch = useDispatch();
	const emailRefs = useRef()

	const signIn = (e) => {
		e.preventDefault();
		
		signInWithEmailAndPassword(auth, emailInput, passwordInput)
			.then(
				setEmailInput(''), 
				setPasswordInput(''), 
				setAuthor(''), 
				setClient(''), 
				closeModal(false)
			)
			.catch(() => {
				closeModal(true)
				alert('Falsche E-Mail oder Passwort!');
				// emailRefs.current.focus()
				// if (trying < 2) {
				// 	closeModal(true);
				// 	array.push([...array, ...err.message])
				// 	// setTrying(console.log(trying + 1))
				// 	// tryingCount()
				// 	// console.log(array);
				// } else {
				// 	if (window.confirm('Der Benutzer existiert nicht! Sich registrieren lassen ? ')) {
				// 		dispatch(setSwitchModal(1));
				// 		setTrying(0);
				// 	} else {
				// 		closeModal(false);
				// 	}
				// }
			});
	};

	// const tryingCount = () => {
	// 	// e.preventDefault()
	// 	setTrying(trying + 1)
	// }

	// console.log(trying);

	// const logOut = () => {
	// 	signOut(auth)
	// }

	return (
		<>
			<form className="modal-form" onSubmit={(e) => signIn(e)}>
				<div className="modal-form__top">
					<div className="modal-form__wrapper">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="rcheckbox"
							id="customer"
							value={client}
							onChange={(e) => setClient(e.target.value)}
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="customer">
							Kunde
						</label>
					</div>
					<div className="modal-form__wrapper">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="checkbox"
							id="painter"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="painter">
							Maler
						</label>
					</div>
				</div>
				<label htmlFor="modal-email">
					<span className="sr-only">Email</span>
				</label>
				<input
					className="modal-form__input"
					type="email"
					placeholder="Email"
					name="email"
					id="modal-email"
					ref={emailRefs}
					required
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
				/>

				<label htmlFor="modal-password">
					<span className="sr-only">Passwort</span>
				</label>
				<input
					className="modal-form__input"
					type="password"
					placeholder="Passwort"
					name="password"
					id="modal-password"
					required
					value={passwordInput}
					onChange={(e) => setPasswordInput(e.target.value)}
				/>

				<button className="modal-form__btn btn btn--red-hover" type="submit">
					Betreten
				</button>

				<div className="modal-form__bottom">
					<div className="modal-form__wrapper">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="[enter]checkbox"
							id="forgotten-password"
						/>
						<div className="auto-park__checkbox checkbox-custom">
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="forgotten-password">
							Passwort merken
						</label>
					</div>
					<Link 
						className="modal-form__link" 
						to={'/PasswortVergessen'}
						onClick={() => closeModal(false)}
						>
						Vergessen Passwort?
					</Link>
				</div>
			</form>
			{/* <button type='button' onClick={tryingCount}>Log out</button> */}
			<span className="modal__enter">Mit sozialen Netzwerken anmelden</span>
			<Social />
		</>
	);
});

export default SignInModal;
