import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore/lite';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { database } from '../../firebase/firebaseConfig';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';
import logo from '../../assets/images/content/logo.svg';
import unknowImage from '../../assets/images/content/unknow-photo.png';

const ReviewModal = memo(({ closeModal }) => {
	const dispatch = useDispatch();
	const ID = useParams();
	const auth = getAuth();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const { authors, authorsStatus } = useSelector((state) => state.authorsInfos);
	const {users, showUserInfo} = useSelector((state) => state.user);
	// const author = auth.currentUser !== null ? authors.find(item => item.emailId === auth.currentUser.email) : null
	const user =
		auth.currentUser !== null
			? users.find((item) => item.emailId === auth.currentUser.email)
			: null;
	const userAuthor =
		auth.currentUser !== null
			? authors.find((item) => item.emailId === auth.currentUser.email)
			: null;
	const [textInput, setTextInput] = useState('');
	const authorInfo = authors.find((item) => item.id == ID.id);

	const userImg = user !== undefined && user.image !== '' ? user.image : unknowImage;
	const authorImg =
		userAuthor !== undefined && userAuthor.image !== '' ? userAuthor.image : unknowImage;
	const userEmail = user !== undefined ? user.emailId : userAuthor.emailId;

	const userMessager = authors.find(item => item.emailId === showUserInfo[0].user.emailId)

	// console.log(userMessager.ID);

	const onSubmit = (e) => {
		e.preventDefault();
		const docToUpdate = doc(database, 'authors', `${authorInfo !== undefined ? authorInfo.ID : userMessager.ID}`);
		updateDoc(docToUpdate, {
			feedBack: arrayUnion({
				avatar: user !== undefined ? userImg : authorImg,
				data: new Date().toLocaleDateString(),
				timeToSend: new Date().toLocaleTimeString(),
				message: textInput,
				name: user !== undefined ? user.name : userAuthor.name,
				rating: '',
				id: authorInfo !== undefined ? authorInfo.feedBack.length + 1 : userMessager.feedBack.length + 1,
				emailId:
					user !== undefined || userAuthor !== undefined ? userEmail : authorInfo.emailId,
			}),
		})
			.then(setTextInput(''), dispatch(closeModal(false)))
			.catch((err) => {
				alert(err.message);
				dispatch(closeModal(true));
			});
	};

	return (
		<form className="submit-message-modal" onSubmit={(e) => onSubmit(e)}>
			<button
				className="submit-message-modal__close-btn"
				onClick={() => dispatch(closeModal(false))}
				type="button"
			>
				<span className="sr-only">{switchBtn ? 'schließen' : 'close'}</span>X
			</button>
			<div className="submit-message-modal__header">
				<img
					className="submit-message-modal__logo"
					src={logo}
					alt="logo"
					width={150}
					height={45}
				/>
				<div className="submit-message-modal__title">
					<span>{switchBtn ? 'Nachricht an den Autor' : 'Message to the author'}:</span>

					<span className="submit-message-modal__author">
						{authorInfo !== undefined ? authorInfo.name : ''}
					</span>
				</div>
			</div>
			<div className="submit-message-modal__wrapper">
				{textInput ? (
					<button
						className="submit-message-modal__clean-btn"
						type="button"
						onClick={() => setTextInput('')}
					>
						<span className="sr-only">
							{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
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
			</div>
			<label className="submit-message-modal__label" htmlFor="message"></label>
			<textarea
				className="submit-message-modal__text"
				type="text"
				id="message"
				name="message"
				placeholder={switchBtn ? 'Shreiben Sie eine Nachricht' : 'Type a message'}
				value={textInput}
				onChange={(e) => setTextInput(e.target.value)}
			/>
			<button className="submit-message-modal__btn btn btn--red btn--universe" type="submit">
				{switchBtn ? 'Senden' : 'Send'}
			</button>
		</form>
	);
});

export default ReviewModal;
