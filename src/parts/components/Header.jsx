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
import { realDb } from '../../firebase/firebaseConfig';
import UserAuthSkeleton from '../../skeletons/userAuthSkeleton';

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

	const [scroll, setScroll] = useState(false);
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [search, setSearch] = useState(false);
	const [burgerBtn, setBurgerBtn] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(true);

	const inputRefs = useRef();
	const formRefs = useRef();
	const dropdownRefs = useRef();
	const userDropdownRefs = useRef();
	const navigate = useNavigate()

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		document.body.addEventListener('click', closeDropdown);
		return () => document.removeEventListener('click', closeDropdown);
	}, []);

	const closeDropdown = (e) => {
		if (!e.path.includes(dropdownRefs.current)) {
			setDropdown(false);
		} else if (!e.path.includes(formRefs.current)) {
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
						setData(Object.values(snapshot.val()));
					}
					setLoading(false);
				});
			} else {
				setLoading(true);
				setData([]);
				// navigate('/')
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
	};

	const changeAuth = () => {
		const findUser = data.find((item) => item.email === user.email);

		const userContent = loading ? <UserAuthSkeleton /> : <UserContent logOut={logOut} findUser={findUser} userDropdownRefs={userDropdownRefs} />;
		const modalContent = loading ? <UserAuthSkeleton /> : <ShowModal modal={modal} setModal={setModal} />;
		return user ? userContent : modalContent;
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
							onBlur={() => setSearch(false)}
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
								<button className="menu__form--btn btn" onClick={() => setInputValue('')}>
									<span className="sr-only">Eingabefeld löschen</span>
									<svg
										version="1.1"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="info" />
										<g id="icons">
											<path
												d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
												id="exit"
											/>
										</g>
									</svg>
								</button>
							)}
							<button className="menu__btn btn" type="submit">
								<span className="sr-only">Suche drücken</span>
								<svg width="16" height="16">
									<use href="assets/images/sprite/search-icon.svg"></use>
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
	const linkRefs = useRef([])
	const [activeLink, setActiveLink] = useState(false)
	const userDropdown = useSelector((state) => state.authorsInfos.userDropdown);
	const dispatch = useDispatch();

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
		const date = new Date().getHours()

		switch (date) {
			case 6: 
				return 'Guten Morgen'
			case 12: 
				return 'Guten Tag'
			case 18:
				return 'Guten Abend'
			case 0:
				return 'Gute Nacht'
			default:
				return 'Guten Tag'
		}
	}

	const focusOnLink = (id) => {
		linkRefs.current.forEach((item) => item.classList.remove('active'));
		linkRefs.current[id].classList.add('active');
		linkRefs.current[id].focus();
	};

	return (
		<div className="user" ref={userDropdownRefs}>
			<button
				className={`user__btn btn btn--red ${userDropdown ? 'active' : ''}`}
				type="button"
				onClick={() => dispatch(setUserDropdown(!userDropdown))}
			>
				Profile
			</button>
			<div className={`user-dropdown ${userDropdown ? 'active' : ''}`}>
				<div className='user-dropdown__title'>{getDate()}!<span className='user-dropdown__name'>{findUser.name}</span></div>
				<ul className='user__list' >
					{userLinks.map(({ id, title, path }) => {
						return (
							<li className="user__item" key={id}>
								<Link 
									ref={(el) => (linkRefs.current[id] = el)}
									className={`user__link ${activeLink ? 'active' : ''}`} 
									to={path} 
									
									onClick={() => (dispatch(setUserDropdown(!userDropdown)), focusOnLink(id))}
									>
									{title}
								</Link>
							</li>
						);
					})}
				</ul>
				<button 
					className="user__btn user__btn--logout btn btn--red" type="button" onClick={logOut}
					>
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
