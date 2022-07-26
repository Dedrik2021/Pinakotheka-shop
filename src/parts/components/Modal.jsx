import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../../assets/images/content/logo.svg';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';
import { setSwitchModal } from '../../redux/slices/authorsInfosSlice';

const Modal = memo(({ closeModal }) => {
	const dispatch = useDispatch()
	const switchModal = useSelector(state => state.authorsInfos.switchModal)

	const switchBtn = [
		{ id: 0, title: 'Eingang' },
		{ id: 1, title: 'Anmeldung' },
	];

	const switchContent = () => {
		switch (switchModal) {
			case 0:
				return <SignInModal closeModal={closeModal} />;
			case 1:
				return <RegisterModal closeModal={closeModal} />;
			default:
				return <SignInModal closeModal={closeModal}  />;
		}
	};

	return (
		<div className="modal" >
			<div className="modal__box">
				<img src={logo} alt="logo" width="150" height="45" />
				<button className="modal__btn btn btn--close" onClick={() => closeModal(false)} type="button">
					<span className="sr-only">Nah dran</span>
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
								onClick={() => dispatch(setSwitchModal(id))}
							>
								{title}
							</button>
						</li>
					);
				})}
			</ul>
			{switchContent()}
		</div>
	);
});

export default Modal;