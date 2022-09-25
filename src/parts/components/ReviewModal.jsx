import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuiv4 } from 'uuid';
import { collection, updateDoc, doc, arrayUnion} from 'firebase/firestore/lite';
import { ref, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { database, realDb } from '../../firebase/firebaseConfig';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';
import logo from '../../assets/images/content/logo.svg';
import unknowImage from '../../assets/images/content/unknow-photo.png'
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';

const ReviewModal = memo(({ closeModal }) => {
	const dispatch = useDispatch();
	const ID = useParams()
	const auth = getAuth()
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0
	const {authors, authorsStatus} = useSelector(state => state.authorsInfos)
	const users = useSelector((state) => state.user.users);
	const user = auth.currentUser !== null ? users.find(item => item.emailId === auth.currentUser.email) : null
	const [textInput, setTextInput] = useState('');
	const authorInfo = authors.find(item => item.id == ID.id)

	const onSubmit = (e) => {
		e.preventDefault();
		// const idMessage = uuiv4();
		// set(ref(realDb, `usersMessages/ ${ID}/ ${idMessage}`), {
		// 	ID: user.id,
		// 	id: idMessage,
		// 	message: textInput,
		// 	name: user.name,
		// 	time: new Date().toLocaleTimeString(),
		// 	date: new Date().toLocaleDateString(),
		// 	rating: '',
		// 	avatar: user.image != '' ? user.image : image,
		// 	email: user.emailId
		// })
			const docToUpdate = doc(database, 'authors', authorInfo.ID)
			updateDoc(docToUpdate, {
				feedBack: arrayUnion({
					avatar: user.image !== '' ? user.image : unknowImage,
					data: new Date().toLocaleDateString(),
					timeToSend: new Date().toLocaleTimeString(),
					message: textInput,
					name: user.name,
					rating: '',
					id: authorInfo.feedBack.length + 1
				})
			})
			.then(
				setTextInput(''), 
				dispatch(closeModal(false)),
			)
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
				<span className="sr-only">
					{switchBtn ? 'schließen' : 'close'}
				</span>
				X
			</button>
			<div className="submit-message-modal__header">
				<img className="submit-message-modal__logo" src={logo} alt="logo" width={150} height={45} />
				<div className="submit-message-modal__title">
					<span>
						{switchBtn ? 'Nachricht an den Autor' : 'Message to the author' }:
					</span>

					<span className="submit-message-modal__author">{authorInfo !== undefined ? authorInfo.name : ''}</span>
</div>
			</div>
            <div className='submit-message-modal__wrapper'>
				{textInput ? (
					<button className="submit-message-modal__clean-btn" type="button" onClick={() => setTextInput('')}>
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
