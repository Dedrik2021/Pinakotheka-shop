import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore/lite';
import { Link } from 'react-router-dom';

import { database } from '../../firebase/firebaseConfig';
import Social from './Social';
import { setSwitchModal } from '../../redux/slices/authorsInfosSlice';

const SignInModals = memo((props) => {
	const {
		closeModal,
		nameInput,
		setNameInput,
		clientInput,
		setClientInput,
		authorInput,
		setAuthorInput,
		telInput,
		setTelInput,
		emailInput,
		setEmailInput,
		passwordInput,
		setPasswordInput,
		doublePasswordInput,
		setDoublePasswordInput,
		checkedAuthor,
		setCheckedAuthor,
		checkedClient,
		setCheckedClient
	} = props
	
	const passwordReff = useRef();
	const checkAuthorRef = useRef();
	const checkClientRef = useRef();
	const emailRef = useRef();
	const auth = getAuth();
	const dispatch = useDispatch();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchModal = useSelector((state) => state.authorsInfos.switchModal);
	const users = useSelector((state) => state.user.users);
	const authors = useSelector((state) => state.authorsInfos.authors);
	const collectionRefClients = collection(database, 'users');
	const collectionRefAuthors = collection(database, 'authors');

	const onRegister = (e) => {
		e.preventDefault();
		if (
			(passwordInput == doublePasswordInput && checkedAuthor === true) ||
			checkedClient === true
		) {
			createUserWithEmailAndPassword(auth, emailInput, passwordInput)
				.then(addData)
				.then(dispatch(setSwitchModal(0)))
				.then(dispatch(closeModal(false)))
				.catch(() => {
					alert(
						switchLanguageBtn == 0
							? 'Die E-Mail-Adresse existiert bereits!'
							: 'The email address already exists!',
					);
					dispatch(closeModal(true));
					dispatch(setSwitchModal(1));
					emailRef.current.focus();
				});
		} else if (checkedAuthor === false && checkedClient === false) {
			checkAuthorRef.current.focus();
			checkClientRef.current.focus();
		} else {
			alert(switchLanguageBtn == 0 ? 'überprüfen Sie Ihr Passwort!' : 'Сheck your password!');
			passwordReff.current.focus();
		}
	};

	const addData = () => {
		if (checkedAuthor === true || checkedClient === false) {
			addAuthorData();
		} else {
			addClientData();
		}
	};

	const addClientData = () => {
		addDoc(collectionRefClients, {
			emailId: emailInput,
			id: users.length + 1,
			name: nameInput,
			email: emailInput,
			tel: telInput,
			password: passwordInput,
			user: checkedAuthor ? authorInput : clientInput,
			dateOfRegister: new Date().toLocaleString(),
			facebook: '',
			instagram: '',
			image: '',
			addressStreet: '',
			city: '',
			country: '',
			chat: [],
			cart: [],
			likeMe: [],
		}).catch((err) => {
			alert(err.message);
		});
	};

	const addAuthorData = () => {
		addDoc(collectionRefAuthors, {
			emailId: emailInput,
			id: authors.length + 1,
			name: nameInput,
			mail: emailInput,
			tel: Number(telInput),
			password: passwordInput,
			user: checkedAuthor ? authorInput : clientInput,
			dateOfRegister: new Date().toLocaleString(),
			facebook: '',
			insta: '',
			image: '',
			city: '',
			country: '',
			chat: [],
			works: [],
			quote: '',
			biography: [],
			rating: 5,
			cite: '',
			info: [],
			feedBack: [],
			cart: [],
			likeMe: [],
		}).catch((err) => {
			alert(err.message);
		});
	};

	const signIn = (e) => {
		e.preventDefault();
		
		signInWithEmailAndPassword(auth, emailInput, passwordInput)
			.then(
				setEmailInput(''), 
				setPasswordInput(''), 
				dispatch(closeModal(false))
			)
			.catch(() => {
				dispatch(closeModal(true))
				alert(switchLanguageBtn == 0 ? 'Falsche E-Mail oder Passwort!' : 'Wrong email or password!');
			});
	};

	return (
		<>
			<form className="modal-form" onSubmit={(e) => switchModal === 1 ? onRegister(e) : signIn(e)}>
				{switchModal === 1 && (
					<>
						<div className="modal-form__top">
							<div className="modal-form__wrapper modal-form__wrapper--users">
								<input
									className="modal-form__checkbox-input checkbox-origin"
									type="checkbox"
									name="client"
									id="modal-user"
									checked={checkedClient}
									// ref={checkBoxRef}
									onChange={(e) => (
										setClientInput(e.target.name),
										setCheckedClient(!checkedClient),
										setCheckedAuthor(false),
										setAuthorInput('')
									)}
								/>
								<div
									className="auto-park__checkbox checkbox-custom"
									tabIndex={0}
									ref={checkClientRef}
								>
									<span></span>
								</div>
								<label className="modal-form__label" htmlFor="modal-user">
									{switchLanguageBtn == 0 ? 'Kunde' : 'User'}
								</label>
							</div>
							<div className="modal-form__wrapper modal-form__wrapper--users">
								<input
									className="modal-form__checkbox-input checkbox-origin"
									type="checkbox"
									name="author"
									id="author"
									checked={checkedAuthor}
									// ref={checkBoxRef}
									onChange={(e) => (
										setAuthorInput(e.target.name),
										setCheckedAuthor(!checkedAuthor),
										setCheckedClient(false),
										setClientInput('')
									)}
								/>
								<div
									className="auto-park__checkbox checkbox-custom"
									tabIndex={0}
									ref={checkAuthorRef}
								>
									<span></span>
								</div>
								<label className="modal-form__label" htmlFor="author">
									{switchLanguageBtn == 0 ? 'Autor' : 'Author'}
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
							placeholder={switchLanguageBtn == 0 ? 'Telefon' : 'Phone'}
							name="tel"
							id="modal-tel"
							required
							value={telInput}
							onChange={(e) => setTelInput(e.target.value)}
						/>
					</>
				)}
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
					ref={emailRef}
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
				/>

				<label htmlFor="modal-password2">
					<span className="sr-only">Passwort</span>
				</label>
				<input
					className="modal-form__input"
					type="password"
					placeholder={switchLanguageBtn == 0 ? 'Passwort' : 'Password'}
					name="password"
					id="modal-password2"
					required
					value={passwordInput}
					onChange={(e) => setPasswordInput(e.target.value)}
				/>

				{switchModal === 1 && (
					<>
						<label htmlFor="modal-repassword">
							<span className="sr-only">Passwort wiederholen</span>
						</label>
						<input
							className="modal-form__input"
							type="password"
							placeholder={
								switchLanguageBtn == 0 ? 'Passwort wiederholen' : 'Repeat Password'
							}
							name="password"
							id="modal-repassword"
							required
							ref={passwordReff}
							value={doublePasswordInput}
							onChange={(e) => setDoublePasswordInput(e.target.value)}
						/>
					</>
				)}

				<button className="modal-form__btn btn btn--red-hover" type="submit">
					{switchModal === 1 ? switchLanguageBtn == 0 ? 'Registrieren' : 'Register' : switchLanguageBtn == 0 ? 'Betreten' : 'Enter'}
				</button>

				{switchModal === 1 ? 
					<div className="modal-form__bottom">
					<div className="modal-form__wrapper-box">
						<input
							className="modal-form__checkbox-input checkbox-origin"
							type="checkbox"
							name="[register]checkbox"
							id="agreement"
							required
						/>
						<div className="auto-park__checkbox checkbox-custom" tabIndex={0}>
							<span></span>
						</div>
						<label className="modal-form__label" htmlFor="agreement">
							{switchLanguageBtn == 0 ? 'Ich stimme den' : 'I agree with the'}{' '}
							<a href="#">
								{switchLanguageBtn == 0
									? 'Dienstordnungsvereinbarung'
									: 'Service Order Agreement'}
							</a>{' '}
							{switchLanguageBtn == 0
								? 'zu den Bedingungen und zu den in der'
								: 'under the terms and conditions of the'}{' '}
							<a href="#">
								{switchLanguageBtn == 0 ? 'Nutzungsvereinbarung' : 'User agreement'}
							</a>{' '}
							{switchLanguageBtn == 0
								? 'beschriebenen Zwecken zu'
								: 'for the purposes described above'}
						</label>
					</div>
				</div>
					:
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
							{switchLanguageBtn == 0 ? 'Passwort merken' : 'Remember Password'}
						</label>
					</div>
					<Link 
						className="modal-form__link" 
						to={switchLanguageBtn == 0 ? '/PasswortVergessen' : 'ForgotYourPassword'}
						onClick={() => dispatch(closeModal(false))}
						>
						{switchLanguageBtn == 0 ? 'Vergessen Passwort?' : 'Forgot your password?'}
					</Link>
				</div>
				}
			</form>
			<span className="modal__enter">
				{switchLanguageBtn == 0
					? 'Mit sozialen Netzwerken anmelden'
					: 'Sign in with social networks'}
			</span>
			<Social />
		</>
	);
});

export default SignInModals;
