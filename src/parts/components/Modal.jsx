import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';

import logo from '../../assets/images/content/logo.svg';
import SignInModals from './SignInModals';
import ReviewModal from './ReviewModal';
import { setSwitchModal } from '../../redux/slices/authorsInfosSlice';

const Modal = memo(({ closeModal }) => {
	const auth = getAuth()
	const dispatch = useDispatch()
	const [nameInput, setNameInput] = useState('');
	const [clientInput, setClientInput] = useState('');
	const [authorInput, setAuthorInput] = useState('');
	const [telInput, setTelInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [doublePasswordInput, setDoublePasswordInput] = useState('');
	const [checkedAuthor, setCheckedAuthor] = useState(false);
	const [checkedClient, setCheckedClient] = useState(false);
	const switchModal = useSelector(state => state.authorsInfos.switchModal)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);

	const switchBtn = [
		{ id: 0, title: switchLanguageBtn[0] === 0 ? 'Eingang' : 'Entrance' },
		{ id: 1, title: switchLanguageBtn[0] === 0 ? 'Anmeldung' : 'Registration' },
	];

	const switchContent = () => {
		if (auth.currentUser !== null) {
			return <ReviewModal closeModal={closeModal}/>
		} else {
			return (
				<div className="modal" >
					<div className="modal__box">
						<img src={logo} alt="logo" width="150" height="45" />
						<button className="modal__btn btn btn--close" onClick={() => dispatch(closeModal(false))} type="button">
							<span className="sr-only">
								{switchLanguageBtn[0] === 0 ? 'Nah dran' : 'Close up'}
							</span>
							<span></span>
						</button>
					</div>
					<ul className="btns-tabs">
						{switchBtn.map(({ id, title }) => {
							return (
								<li className="btns-tabs__item" key={id}>
									<button
										className={`btns-tabs__btn btn ${switchModal === id ? 'active' : ''}`}
										data-content="modal-form__item--enter"
										type="button"
										onClick={() => (
												dispatch(setSwitchModal(id)),
												setNameInput(''),
												setClientInput(''),
												setAuthorInput(''),
												setTelInput(''),
												setEmailInput(''),
												setPasswordInput(''),
												setDoublePasswordInput(''),
												setCheckedAuthor(false),
												setCheckedClient(false)
											)
										}
									>
										{title}
									</button>
								</li>
							);
						})}
					</ul>
					<SignInModals closeModal={closeModal} nameInput={nameInput} setNameInput={setNameInput} clientInput={clientInput} setClientInput={setClientInput} authorInput={authorInput} setAuthorInput={setAuthorInput} telInput={telInput} setTelInput={setTelInput} emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} doublePasswordInput={doublePasswordInput} setDoublePasswordInput={setDoublePasswordInput} checkedAuthor={checkedAuthor} setCheckedAuthor={setCheckedAuthor} checkedClient={checkedClient} setCheckedClient={setCheckedClient} />
				</div>
				
			);
		}
	}

	return (
		<>{switchContent()}</>
	);
});

export default Modal;
