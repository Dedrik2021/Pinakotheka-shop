import { useRef, useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, onSnapshot, doc, updateDoc } from 'firebase/firestore/lite';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { ref, onValue, update } from 'firebase/database';
// import axios from 'axios';

import logo from '../../assets/images/content/logo.svg';
import { setSwitchLanguageBtn } from '../../redux/slices/filtersSlice';
import Modal from './Modal';
import { setUserDropdown, setModal, fetchAuthorsData } from '../../redux/slices/authorsInfosSlice';
import { database, realDb } from '../../firebase/firebaseConfig';
import UserAuthSkeleton from '../../skeletons/userAuthSkeleton';
import {
	setUserData,
	setClientUsers,
	setAuthorUsers,
	setUsers,
	setDataUsers,
	setFoundUser,
	setShowUserInfo,
	fetchUsersData,
} from '../../redux/slices/userSlice';
import img from '../../assets/images/content/unknow-photo.png';
import SearchIcon from '../../assets/images/sprite/search-icon.svg';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';
import UserIcon from '../../assets/images/sprite/user-icon.svg';
import ShowModal from './ShowModal';
import ReviewModal from './ReviewModal';

const Header = () => {
	const dispatch = useDispatch();
	const switchBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const data = useSelector((state) => state.user.userData);
	const { clientUsers, authorUsers, users, dataUsers, usersFirestore, usersStatus } = useSelector(
		(state) => state.user,
	);
	const { modal, authors, authorsStatus } = useSelector((state) => state.authorsInfos);
	// const userEmail = useSelector(state => state.user.userEmail)

	const [scroll, setScroll] = useState(false);
	// const [modal, setModal] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [search, setSearch] = useState(false);
	const [burgerBtn, setBurgerBtn] = useState(false);
	const [inputValue, setInputValue] = useState('');
	// const [loading, setLoading] = useState(true);
	// const [usersArray, setUsersArray] = useState([]);
	// const [getUsers, setGetUsers] = useState([]);

	// const [languages, setLanguages] = useState([]);
	// const [outputPath, setOutputPath] = useState('')
	// const [fromLanguage, setFromLanguage] = useState('')
	// const [toLanguage, setToLanguage] = useState('')

	// const [getData, setGetData] = useState('')

	const inputRefs = useRef();
	const formRefs = useRef();
	const dropdownRefs = useRef();
	const userDropdownRefs = useRef();
	const navigate = useNavigate();
	// const pathName = window.location.pathname;

	const auth = getAuth();
	const user = auth.currentUser;
	const findUser =
		user !== null &&
		(users.find((item) => item.emailId === user.email) ||
			authors.find((item) => item.emailId === user.email));

	useEffect(() => {
		dispatch(setFoundUser(findUser));
	}, [findUser]);

	// console.log(foundUser);
	// useEffect(() => {
	// 	axios
	// 		.get('https://libretranslate.com/languages', {
	// 			headers: {
	// 				accept: 'application/json',
	// 			},
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setLanguages(res.data);
	// 		});
	// }, []);

	// console.log(window.location.pathname);

	// const translate = () => {
	// 	const params = new URLSearchParams();
	// 	params.append('q', pathName);
	// 	params.append('source', fromLanguage);
	// 	params.append('target', toLanguage);
	// 	params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

	// 	axios
	// 		.post('https://libretranslate.de/translate', params, {
	// 			headers: {
	// 				accept: 'application/json',
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 			},
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data.translatedText);
	// 			setOutputPath(res.data.translatedText);
	// 		});
	// };

	// console.log(outputPath);
	// console.log(window.location.pathname);
	// console.log(language);

	const linksBtns = [
		{
			id: 0,
			title: switchBtn == 0 ? 'Kreationen' : 'Creations',
			src: '#',
		},
		{
			id: 1,
			title: switchBtn == 0 ? 'Nachrichten' : 'News',
			src: switchBtn == 0 ? '/Nachrichten' : '/News',
		},
		{
			id: 2,
			title: switchBtn == 0 ? 'Über das Projekt' : 'About this project',
			src: '#',
		},
		{
			id: 3,
			title: 'Error-404',
			src: '/Error-404',
		},
		{
			id: 4,
			title: 'FAQ',
			src: '#',
		},
		{
			id: 5,
			title: switchBtn == 0 ? 'Nutzungsbedingungen' : 'Terms and Conditions',
			src: '#',
		},
		{
			id: 6,
			title: switchBtn == 0 ? 'Für Autoren' : 'For authors',
			src: '#',
		},
		{
			id: 7,
			title: switchBtn == 0 ? 'Garantien' : 'Guarantees',
			src: '#',
		},
		{
			id: 8,
			title: switchBtn == 0 ? 'Kontakte' : 'Contacts',
			src: '#',
		},
		{
			id: 9,
			title: switchBtn == 0 ? 'Passwort vergessen' : 'Forgot your password',
			src: switchBtn == 0 ? '/PasswortVergessen' : '/ForgotYourPassword',
		},
		{
			id: 10,
			title: switchBtn == 0 ? 'Nachrichten erstellen' : 'Create news',
			src: switchBtn == 0 ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews',
		},
	];

	const menuBtns = [
		{
			id: 0,
			name: switchBtn == 0 ? 'Autoren' : 'Authors',
			href: switchBtn == 0 ? '/Autoren' : '/Authors',
		},
		{
			id: 1,
			name: switchBtn == 0 ? 'Arbeitsplan' : 'Work schedule',
			href: switchBtn == 0 ? '/Arbeitsplan' : '/WorkSchedule',
		},
	];

	const languageBtns = [
		{ id: 0, title: 'De' },
		{ id: 1, title: 'En' },
	];

	useEffect(() => {
		document.body.addEventListener('click', closeDropdown);
		return () => document.removeEventListener('click', closeDropdown);
	}, []);

	useEffect(() => {
		document.body.addEventListener('click', closeSearch);
		return () => document.removeEventListener('click', closeSearch);
	}, []);

	const closeDropdown = (e) => {
		if (!e.path.includes(dropdownRefs.current)) {
			setDropdown(false);
		}
	};

	const closeSearch = (e) => {
		if (!e.path.includes(formRefs.current)) {
			setSearch(false);
			setInputValue('');
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, (snapshot) => {
			if (snapshot) {
				// onValue(ref(realDb, 'users'), (snapshot) => {
				// 	setLoading(true);
				// 	if (snapshot.exists()) {
				// 		dispatch(setUserData(Object.values(snapshot.val())));
				// 	}
				// 	setLoading(false);
				// });

				// onValue(ref(realDb, 'usersIdentify'), (snapshot) => {
				// 	setLoading(true);
				// 	if (snapshot.exists()) {
				// 		dispatch(setUsers(Object.values(snapshot.val())))
				// 	}
				// 	setLoading(false);
				// });

				// getDocs(collection(database, users)).then((response) => {
				// 	setLoading(true);
				// 	const data = response.docs.map((item) => {
				// 		return { ...item.data(), id: item.id };
				// 	})
				// 	dispatch(setUsers(data))
				// 	setLoading(false);
				// });
				// setLoading(false)
				// dispatch(setUsers(usersFirestore))
				dispatch(fetchUsersData());
				dispatch(fetchAuthorsData());
			} else {
				// setLoading(true);
				// dispatch(fetchAuthorsData([]));
				// dispatch(setUsers([]))
				// setLoading(false);
				dispatch(fetchUsersData([]));
			}
		});
		onValue(ref(realDb, 'switchLanguageBtn'), (snapshot) => {
			if (snapshot.exists()) {
				dispatch(setSwitchLanguageBtn(Object.values(snapshot.val())));
			}
		});
		dispatch(fetchAuthorsData());
	}, []);

	// useEffect(() => {
	// 	dispatch(setClientUsers(user !== null ? users.find((el) => el.emailId === user.email) : null));
	// 	dispatch(setAuthorUsers(user !== null ? authors.find((el) => el.emailId === user.email) : null));
	// }, [users, authors]);

	useEffect(() => {
		const checkScroll = () => {
			let scrollPos = window.scrollY;
			if (scrollPos > 0) {
				setScroll(true);
				setDropdown(false);
				dispatch(setUserDropdown(false));
			} else {
				setScroll(false);
			}
		};
		document.addEventListener('scroll', checkScroll);
	}, []);

	const onSearchOpen = (e) => {
		e.preventDefault();
		setSearch(true);
		setDropdown(false);
		inputRefs.current.focus();
	};

	const logOut = () => {
		if (
			window.confirm(
				switchBtn == 0
					? 'Sie sind sicher, dass Sie gehen wollen ?'
					: 'Are you sure that you want to log out?',
			)
		) {
			signOut(auth);
			dispatch(setUserDropdown(false));
			dispatch(setModal(false));
			navigate('/');
		} 
	};

	const changeAuth = () => {
		if (user !== null) {
			// const findUser = user &&
			// 	(users.find((item) => item.emailId === user.email) ||
			// 	authors.find(item => item.emailId === user.email))
			const userContent =
				usersStatus === 'loading' || usersStatus === 'error' ? (
					<UserAuthSkeleton />
				) : (
					<UserContent
						logOut={logOut}
						findUser={findUser}
						userDropdownRefs={userDropdownRefs}
						switchBtn={switchBtn}
					/>
				);
			return userContent;
		} else {
			return usersStatus === 'loading' || usersStatus === 'error' ? (
				<UserAuthSkeleton />
			) : (
				<ShowModal modal={modal} setModal={setModal} />
			);
		}
	};
	// const changeModal = () => {
	// 	if (user !== null || dataAuthor !== null) {
	// 		return <ReviewModal
	// 			closeModal={setModal}
	// 			user={user}
	// 			authorInfo={authorInfo}
	// 			authorID={dataAuthor}
	// 			id={id}
	// 			/>
	// 	} else {
	// 		return <Modal closeModal={setModal}/>
	// 	}
	// }

	const switchLanguage = (id) => {
		// dispatch(setSwitchLanguageBtn(id))
		const docToUpdates = ref(realDb, `switchLanguageBtn`);
		update(docToUpdates, {
			ID: id,
		}).catch((err) => {
			alert(err.message);
		});
	};

	return (
		<header className={`header ${scroll ? 'sticky' : ''}`}>
			<div className="container">
				{modal && <Modal closeModal={setModal} />}
				<nav className={`menu ${modal ? 'active' : ''}`}>
					<Link className="logo header__logo" to={'/'}>
						<img src={logo} alt="logo" width="180" height="50" />
					</Link>
					<button
						className={`menu__burger btn ${burgerBtn ? 'active' : ''}`}
						type="button"
						onClick={() => setBurgerBtn(!burgerBtn)}
					>
						<span className="sr-only">
							{switchBtn == 0 ? 'Öffne das Menü' : 'Open the menu'}
						</span>
						<span></span>
					</button>
					<div className={`menu__inner ${burgerBtn ? 'active' : ''}`}>
						<form
							className={`menu__form ${search ? 'active' : ''}`}
							onClick={(e) => onSearchOpen(e)}
							ref={formRefs}
							onFocus={() => setSearch(true)}
						>
							<label className="menu__label" htmlFor="nav-search">
								<span className="sr-only">
									{switchBtn == 0 ? 'Suche' : 'Search'}
								</span>
							</label>
							<input
								className={`menu__search ${search ? 'active' : ''}`}
								ref={inputRefs}
								type="search"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								name="[nav]search"
								placeholder={
									switchBtn == 0 ? 'Tippe um zu suchen' : 'Tap to search'
								}
								id="nav-search"
								required
							/>
							{inputValue ? (
								<button
									className="menu__form--btn btn"
									type="button"
									onClick={() => setInputValue('')}
								>
									<span className="sr-only">
										{switchBtn == 0
											? 'Eingabefeld löschen'
											: 'Delete input field'}
									</span>
									<svg width="20" height="20">
										<use href={`${CleanInputIcon}#clean-input`}></use>
									</svg>
								</button>
							) : (
								<svg className="keyboard" width="20" height="20">
									<use href={`${Keyboard}#keyboard`}></use>
								</svg>
							)}
							<button
								className="menu__btn btn"
								type="submit"
								onBlur={() => setSearch(false)}
							>
								<span className="sr-only">
									{switchBtn == 0 ? 'Suche drücken' : 'Press Search'}
								</span>
								<svg width="16" height="16">
									<use href={`${SearchIcon}#search-icon`}></use>
								</svg>
							</button>
						</form>
						<ul className="menu__list">
							<li
								className={`menu__item menu__item--dropdown ${
									dropdown ? 'active' : ''
								}`}
								onFocus={() => setDropdown(true)}
								onBlur={() => setDropdown(false)}
							>
								<button
									// onBlur={() => setDropdown(false)}
									ref={dropdownRefs}
									className={`menu__link ${dropdown ? 'active' : ''}`}
									type="button"
									onClick={() => setDropdown(true)}
								>
									{switchBtn == 0 ? 'Katalog' : 'Catalog'}
								</button>
								<span className="menu__border-bottom"></span>
								<ul className="menu-dropdown">
									{linksBtns.map(({ id, title, src }) => (
										<li className="menu-dropdown__item" key={id}>
											<Link className="menu-dropdown__link" to={src}>
												{title}
											</Link>
										</li>
									))}
								</ul>
							</li>
							{menuBtns.map(({ id, name, href }) => (
								<li key={id} className="menu__item">
									<Link className="menu__link" to={href}>
										{name}
									</Link>
									<span className="menu__border-bottom"></span>
								</li>
							))}
						</ul>
					</div>
					<div className={`menu__box ${burgerBtn ? 'active' : ''}`}>
						<ul className="language-switcher">
							{languageBtns.map(({ id, title }) => (
								<li className="language-switcher__item" key={id}>
									<button
										className={`language-switcher__btn btn ${
											switchBtn[0] === id ? 'active' : ''
										}`}
										type="button"
										onClick={() => (
											switchLanguage(id),
											// translate(),
											// setFromLanguage(lang.code),
											// setToLanguage(lang.code != 'de' ? 'de' : 'en')
											navigate('/')
										)}
									>
										{/* {languages != '' ? lang.code : title} */}
										{title}
									</button>
								</li>
							))}
						</ul>
						{changeAuth()}
					</div>
				</nav>
			</div>
		</header>
	);
};

const UserContent = memo((props) => {
	const { logOut, findUser, userDropdownRefs } = props;
	const linkRefs = useRef([]);
	const [activeLink, setActiveLink] = useState(false);
	const userDropdown = useSelector((state) => state.authorsInfos.userDropdown);
	const dispatch = useDispatch();
	const langageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = langageBtn[0] === 0;

	const auth = getAuth();
	const user = auth.currentUser;

	const userLinks = [
		{
			id: 0,
			title: switchBtn ? 'Persönliches Büro' : 'Personal Office',
			path: switchBtn ? '/PersonlichesBuro' : '/PersonalOffice',
		},
		{
			id: 1,
			title: switchBtn ? 'Was dir gefällt:' : 'What you like:',
			path: switchBtn ? '/DieIhnenGefallen' : '/WhatYouLike',
			countItems: findUser && findUser.likeMe.length,
		},
		{
			id: 2,
			title: switchBtn ? 'Korb:' : 'Cart:',
			path: switchBtn ? '/Korb' : '/Cart',
			countItems: findUser && findUser.cart.length,
		},
	];

	const authorLinks = [
		{
			id: 0,
			title: switchBtn ? 'Persönliches Büro' : 'Personal Office',
			path: `${switchBtn ? '/Autor/' : '/Author/'}${findUser ? findUser.id : null}`,
		},
		{
			id: 1,
			title: switchBtn ? 'Was dir gefällt:' : 'What you like:',
			path: switchBtn ? '/DieIhnenGefallen' : '/WhatYouLike',
			countItems: findUser && findUser.likeMe.length,
		},
		{
			id: 2,
			title: switchBtn ? 'Korb:' : 'Cart:',
			path: switchBtn ? '/Korb' : '/Cart',
			countItems: findUser && findUser.cart.length,
		},
	];

	useEffect(() => {
		document.body.addEventListener('click', closeDropdown);
		return () => document.removeEventListener('click', closeDropdown);
	}, []);

	const closeDropdown = (e) => {
		if (!e.path.includes(userDropdownRefs.current)) {
			dispatch(setUserDropdown(false));
		}
	};

	const getDate = () => {
		const date = new Date().getHours();

		switch (date) {
			case 6:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 7:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 8:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 9:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 10:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 11:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 12:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 13:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 14:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 15:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 16:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 17:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 18:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 19:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 20:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 21:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 22:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 23:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 0:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 1:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 2:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 3:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 4:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 5:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			default:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
		}
	};

	const focusOnLink = (id) => {
		linkRefs.current.forEach((item) => item.classList.remove('active'));
		linkRefs.current[id].classList.add('active');
		linkRefs.current[id].focus();
	};

	const onUserLink = (userInfo) => {
		const docToUpdate = doc(database, 'showUserInfo', 'IezwG0ZPPzWGDNIxTiUI');
		updateDoc(docToUpdate, {
			user: userInfo,
		}).catch((err) => {
			alert(err.message);
		});
	};

	if (findUser != undefined) {
		return (
			<div className={`user`} ref={userDropdownRefs}>
				<img
					className={`user__img`}
					src={findUser.image != '' ? findUser.image : img}
					alt={findUser.name}
				/>
				<button
					className={`user__btn btn btn--red ${userDropdown ? 'active' : ''}`}
					type="button"
					onClick={() => dispatch(setUserDropdown(!userDropdown))}
				>
					Profile
					<svg width="18" height="18">
						<use href={`${UserIcon}#user`}></use>
					</svg>
				</button>
				<div className={`user-dropdown ${userDropdown ? 'active' : ''}`}>
					<div className="user-dropdown__title">
						{getDate()}!<span className="user-dropdown__name">{findUser.name}</span>
					</div>
					<ul className="user__list">
						{findUser.user === 'author'
							? authorLinks.map(({ id, title, path, countItems }) => {
									return (
										<li className="user__item" key={id}>
											<Link
												ref={(el) => (linkRefs.current[id] = el)}
												className={`user__link ${
													activeLink ? 'active' : ''
												}`}
												to={path}
												onClick={() => (
													dispatch(setUserDropdown(!userDropdown)),
													focusOnLink(id),
													onUserLink(findUser)
												)}
											>
												{title} <span>{countItems}</span>
											</Link>
										</li>
									);
							})
							: userLinks.map(({ id, title, path, countItems }) => {
									return (
										<li className="user__item" key={id}>
											<Link
												ref={(el) => (linkRefs.current[id] = el)}
												className={`user__link ${
													activeLink ? 'active' : ''
												}`}
												to={path}
												// state={{ changeUser: findUser }}
												onClick={() => (
													dispatch(setUserDropdown(!userDropdown)),
													focusOnLink(id),
													onUserLink(findUser)
												)}
											>
												{title} <span>{countItems}</span>
											</Link>
										</li>
									);
							})}
					</ul>
					<button
						className="user__btn user__btn--logout btn btn--red"
						type="button"
						onClick={logOut}
					>
						Log out
					</button>
				</div>
			</div>
		);
	}
});

export default Header;
