import { useRef, useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore/lite';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

import logo from '../../assets/images/content/logo.svg';
import { setSwitchLanguageBtn } from '../../redux/slices/filtersSlice';
import Modal from './Modal';
import { setUserDropdown } from '../../redux/slices/authorsInfosSlice';
import { database, realDb } from '../../firebase/firebaseConfig';
import UserAuthSkeleton from '../../skeletons/userAuthSkeleton';
import { setUserData, setUserEmail } from '../../redux/slices/userSlice';
import img from '../../assets/images/content/unknow-photo.png';
import SearchIcon from '../../assets/images/sprite/search-icon.svg';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import UserIcon from '../../assets/images/sprite/user-icon.svg';

const Header = () => {
	const linksBtns = [
		{ id: 0, title: 'Kreationen', src: '' },
		{ id: 1, title: 'Nachrichten', src: '' },
		{ id: 2, title: 'Über das Projekt', src: '' },
		{ id: 3, title: 'Error-404', src: '' },
		{ id: 4, title: 'FAQ', src: '/faq.html' },
		{ id: 5, title: 'Nutzungsbedingungen', src: '' },
		{ id: 6, title: 'Für Autoren', src: '' },
		{ id: 7, title: 'Passwort vergessen', src: '' },
		{ id: 8, title: 'Garantien', src: '' },
		{ id: 9, title: 'Kontakte', src: '' },
	];

	const menuBtns = [
		{ id: 0, name: 'Autoren', href: '' },
		{ id: 1, name: 'Arbeitsplan', href: '' },
	];

	const languageBtns = [
		{ id: 0, title: 'De' },
		{ id: 1, title: 'En' },
	];

	const dispatch = useDispatch();
	const switchBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const data = useSelector((state) => state.user.userData);
	// const userEmail = useSelector(state => state.user.userEmail)

	const [scroll, setScroll] = useState(false);
	const [modal, setModal] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [search, setSearch] = useState(false);
	const [burgerBtn, setBurgerBtn] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(true);

	// const [getData, setGetData] = useState('')

	const inputRefs = useRef();
	const formRefs = useRef();
	const dropdownRefs = useRef();
	const userDropdownRefs = useRef();
	const navigate = useNavigate();

	const auth = getAuth();
	const user = auth.currentUser;

	if (formRefs.current === 'blur') {
		setSearch(false)
	}

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
				onValue(ref(realDb, 'users'), (snapshot) => {
					setLoading(true);
					if (snapshot.exists()) {
						dispatch(setUserData(Object.values(snapshot.val())));
					}
					setLoading(false);
				});
			} else {
				setLoading(true);
				dispatch(setUserData([]));
				setLoading(false);
			}
		});
	}, []);

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
		if (window.confirm('Sie sind sicher, dass Sie gehen wollen ?')) signOut(auth);
		dispatch(setUserDropdown(false));
		navigate('/');
	};

	const changeAuth = () => {
		if (user != null) {
			const findUser = data.find((item) => item.emailId === user.email);

			const userContent = loading ? (
				<UserAuthSkeleton />
			) : (
				<UserContent logOut={logOut} findUser={findUser} userDropdownRefs={userDropdownRefs} />
			);
			return user ? userContent : null;
		} else {
			const modalContent = loading ? <UserAuthSkeleton /> : <ShowModal modal={modal} setModal={setModal} />;
			return modalContent;
		}
	};

	return (
		<header className={`header ${scroll ? 'sticky' : ''}`}>
			<div className="container">
				<nav className="menu">
					<Link className="logo header__logo" to={'/'}>
						<img src={logo} alt="logo" width="180" height="50" />
					</Link>
					<button
						className={`menu__burger btn ${burgerBtn ? 'active' : ''}`}
						type="button"
						onClick={() => setBurgerBtn(!burgerBtn)}
					>
						<span className="sr-only">Öffne das Menü</span>
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
								<span className="sr-only">Suche</span>
							</label>
							<input
								className={`menu__search ${search ? 'active' : ''}`}
								ref={inputRefs}
								type="search"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								name="[nav]search"
								placeholder="Tippe um zu suchen"
								id="nav-search"
								required
							/>
							{inputValue && (
								<button className="menu__form--btn btn" type="button" onClick={() => setInputValue('')}>
									<span className="sr-only">Eingabefeld löschen</span>
									<svg width="20" height="20">
										<use href={`${CleanInputIcon}#clean-input`}></use>
									</svg>
								</button>
							)}
							<button className="menu__btn btn" type="submit">
								<span className="sr-only">Suche drücken</span>
								<svg width="16" height="16">
									<use href={`${SearchIcon}#search-icon`}></use>
								</svg>
							</button>
						</form>
						<ul className="menu__list">
							<li
								className={`menu__item menu__item--dropdown ${dropdown ? 'active' : ''}`}
								ref={dropdownRefs}
							>
								<button
									className={`menu__link ${dropdown ? 'active' : ''}`}
									onClick={() => setDropdown(!dropdown)}
									type="button"
								>
									Katalog
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
										className={`language-switcher__btn btn ${switchBtn === id ? 'active' : ''}`}
										type="button"
										onClick={() => dispatch(setSwitchLanguageBtn(id))}
									>
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

	const auth = getAuth();
	const user = auth.currentUser;

	const userLinks = [
		{ id: 0, title: 'Persönliches Büro', path: '/PersonlichesBuro' },
		{ id: 1, title: 'Die Ihnen gefallen', path: '/DieIhnenGefallen' },
		{ id: 2, title: 'Korb', path: '/Korb' },
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
				return 'Guten Morgen';
			case 7:
				return 'Guten Morgen';
			case 8:
				return 'Guten Morgen';
			case 9:
				return 'Guten Morgen';
			case 10:
				return 'Guten Morgen';
			case 11:
				return 'Guten Morgen';
			case 12:
				return 'Guten Tag';
			case 13:
				return 'Guten Tag';
			case 14:
				return 'Guten Tag';
			case 15:
				return 'Guten Tag';
			case 16:
				return 'Guten Tag';
			case 17:
				return 'Guten Tag';
			case 18:
				return 'Guten Abend';
			case 19:
				return 'Guten Abend';
			case 20:
				return 'Guten Abend';
			case 21:
				return 'Guten Abend';
			case 22:
				return 'Guten Abend';
			case 23:
				return 'Guten Abend';
			case 0:
				return 'Gute Nacht';
			case 1:
				return 'Gute Nacht';
			case 2:
				return 'Gute Nacht';
			case 3:
				return 'Gute Nacht';
			case 4:
				return 'Gute Nacht';
			case 5:
				return 'Gute Nacht';
			default:
				return 'Guten Tag';
		}
	};

	const focusOnLink = (id) => {
		linkRefs.current.forEach((item) => item.classList.remove('active'));
		linkRefs.current[id].classList.add('active');
		linkRefs.current[id].focus();
	};

	return (
		<div className="user" ref={userDropdownRefs}>
			<img className="user__img" src={findUser.image === '' ? img : findUser.image} alt={findUser.name} />
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
					{userLinks.map(({ id, title, path }) => {
						return (
							<li className="user__item" key={id}>
								<Link
									ref={(el) => (linkRefs.current[id] = el)}
									className={`user__link ${activeLink ? 'active' : ''}`}
									to={path}
									state={{ from: 'Personliches Buro' }}
									onClick={() => (dispatch(setUserDropdown(!userDropdown)), focusOnLink(id))}
								>
									{title}
								</Link>
							</li>
						);
					})}
				</ul>
				<button className="user__btn user__btn--logout btn btn--red" type="button" onClick={logOut}>
					Log out
				</button>
			</div>
		</div>
	);
});

const ShowModal = memo(({ modal, setModal }) => {
	return (
		<div className={`menu__user-box ${modal ? 'active' : ''}`}>
			<button onClick={() => setModal(!modal)} className="menu__enter-btn btn" type="button">
				Eingang
			</button>
			{modal && <Modal closeModal={setModal} />}
		</div>
	);
});

export default Header;
