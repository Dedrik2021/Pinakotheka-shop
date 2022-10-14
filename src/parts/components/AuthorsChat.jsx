import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { collection, getDocs, doc, updateDoc, arrayUnion, query, orderBy, addDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';
import { database } from '../../firebase/firebaseConfig';
import unknowImage from '../../assets/images/content/unknow-photo.png';

const AuthorsChat = memo(({ authorInfo }) => {
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	// const authors = useSelector(state => state.authorsInfos.authors)
	const foundUser = useSelector((state) => state.user.foundUser);
	const switchBtn = switchLanguageBtn[0] === 0;
	const [inputUserValue, setInputUserValue] = useState('');
	const [inputAuthorValue, setInputAuthorValue] = useState('');
	// const [messages, setMessages] = useState([]);
	// const collectionRef = collection(database, 'messages');
	// const collectionQuery = query(collectionRef);

	const onSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();
		// if () {

		// } else {

		// }

		// addDoc(collectionRef, {
		// 	chat: arrayUnion({
		// 		message:
		// 			foundUser.user === 'client'
		// 				? inputUserValue !== ''
		// 					? inputUserValue
		// 					: alert(switchBtn ? 'Geben Sie eine Nachricht ein' : 'Enter a message')
		// 				: inputAuthorValue !== ''
		// 				? inputAuthorValue
		// 				: alert(switchBtn ? 'Geben Sie eine Nachricht ein' : 'Enter a message'),
		// 		date: new Date().toLocaleDateString(),
		// 		time: new Date().toLocaleTimeString(),
		// 		name: foundUser.user === 'client' ? foundUser.name : authorInfo.name,
		// 		avatar:
		// 			foundUser.user === 'client'
		// 				? foundUser.image !== ''
		// 					? foundUser.image
		// 					: unknowImage
		// 				: authorInfo.image !== ''
		// 				? authorInfo.image
		// 				: unknowImage,
		// 		id: id
		// 	}),
		// })

		const docToUpdates = doc(
			database,
			foundUser.user === 'client' ? 'authors' : 'users',
			foundUser.user === 'client' ? authorInfo.ID : foundUser.ID,
			// database,
			// 'messages',
			// 'Unc61KQj1VBDbfAyOW01',
		);

		updateDoc(docToUpdates, {
			chat: arrayUnion({
				message:
					foundUser.user === 'client'
						? inputUserValue !== ''
							? inputUserValue
							: alert(switchBtn ? 'Geben Sie eine Nachricht ein' : 'Enter a message')
						: inputAuthorValue !== ''
						? inputAuthorValue
						: alert(switchBtn ? 'Geben Sie eine Nachricht ein' : 'Enter a message'),
				date: new Date().toLocaleDateString(),
				time: new Date().toLocaleTimeString(),
				name: foundUser.user === 'client' ? foundUser.name : authorInfo.name,
				avatar:
					foundUser.user === 'client'
						? foundUser.image !== ''
							? foundUser.image
							: unknowImage
						: authorInfo.image !== ''
						? authorInfo.image
						: unknowImage,
				id: id,
			}),
		})
			.then(() => {
				alert('Data updated');
				setInputAuthorValue('');
				setInputUserValue('');
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	// useEffect(() => {
	// 	getDocs(collectionQuery).then((res) => {
	// 		const data = res.docs.map((item) => {
	// 			return { ...item.data(), ID: item.id };
	// 		});
	// 		setMessages(data);
	// 	});
	// }, [messages]);

	// console.log(messages.map(item => item.chat.length));
	// const el = messages.map((item) => item.chat);
	// let data = []
	// for (const i of el) {
	// 	for (const key in i) {
	// 		if (Object.hasOwnProperty.call(i, key)) {
	// 			const element = i[key];
	// 			data.push(element)
	// 		}
	// 	}
	// }

	// console.log(data.filter(item => item.name));

	return (
		<>
			<Helmet>
				<meta name="description" content="Chat" />
				<title>Chat</title>
			</Helmet>
			<div className="author-chat">
				{/* <div className='author-chat__date'>Today</div> */}
				{authorInfo &&
					authorInfo.chat.map((item, i) => {
						return (
							<div className="author-chat__date" key={i}>
								{item.date === new Date().toLocaleDateString() ? 'Today' : item.date}
							</div>
						);
					})}
				<ul className="author-chat__list">
					{authorInfo &&
						authorInfo.chat.map((item, i) => {
							return (
								<div key={i}>
									{/* <li className="author-chat__date">
										{item.date === new Date().toLocaleDateString() ? 'Today' : item.date}
									</li> */}
									<li className="author-chat__item">
										<div className="author-chat__inner">
											<article className="author-chat__message">
												<div className="author-chat__img-wrapper">
													<img src={item.avatar} alt={item.name} />
												</div>
												<div className="author-chat__box">
													<span className="author-chat__name">{item.name}</span>
													<div className="author-chat__text">
														<p>{item.message}</p>
													</div>
												</div>
											</article>
											<div className="author-chat__time">
												<span>{item.time}</span>
											</div>
										</div>
									</li>
								</div>
							);
						})}
					{/* <li className="author-chat__date">{''}</li> */}
					{/* <li className="author-chat__item">
						<div className="author-chat__inner">
							<article className="author-chat__message">
								<div className="author-chat__img-wrapper">
									<img
										src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
										alt={''}
									/>
								</div>
								<div className="author-chat__box">
									<span className="author-chat__name">{'Name'}</span>
									<div className="author-chat__text">
										<p>{'jjjjjjjjjujujujujujuhyhyhyhyhyhyhy'}</p>
									</div>
								</div>
							</article>
							<div className="author-chat__time">
								<span>12:22</span>
							</div>
						</div>
					</li> */}
					{foundUser.chat.map((item) => {
						return (
							<li className="author-chat__item author-chat__item--right">
								<div className="author-chat__inner">
									<div className="author-chat__time author-chat__time--right">
										<span>{item.time}</span>
									</div>
									<article className="author-chat__message">
										<div className="author-chat__img-wrapper">
											<img src={item.avatar} alt={item.name} />
										</div>
										<div className="author-chat__box">
											<span className="author-chat__name">{item.name}</span>
											<div className="author-chat__text">
												<p>{item.message}</p>
											</div>
										</div>
									</article>
								</div>
							</li>
						);
					})}
					{/* <li className="author-chat__item author-chat__item--right">
						<div className="author-chat__inner">
							<div className="author-chat__time author-chat__time--right">
								<span>12:22</span>
							</div>
							<article className="author-chat__message">
								<div className="author-chat__img-wrapper">
									<img
										src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
										alt={''}
									/>
								</div>
								<div className="author-chat__box">
									<span className="author-chat__name">{'Name'}</span>
									<div className="author-chat__text">
										<p>{'jjjjjjjjjujujujujujuhyhyhyhyhyhyhy'}</p>
									</div>
								</div>
							</article>
						</div>
					</li> */}
				</ul>
				{/* <ul className="user-chat__list">
					<li className="user-chat__item">
						<div className="user-chat__inner">
							<span className="user-chat__time">12:22</span>
							<article className="user-chat__message">
								<div className="user-chat__img-wrapper">
									<img
										src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
										alt={''}
										height="150"
										width="150"
									/>
								</div>
								<div className="user-chat__box">
									<span className="user-chat__name">{'Name'}</span>
									<div className="user-chat__text">
										<p>{'jjjjjjjjjujujujujujuhyhyhyhyhyhyhy'}</p>
									</div>
								</div>
							</article>
						</div>
					</li>
				</ul> */}
				{/* </div> */}
				<form className="author-chat__form" onSubmit={(e) => onSubmit(e)}>
					<label className="author-chat__label" htmlFor="chat-message"></label>
					<textarea
						className="author-chat__textarea"
						name="[chat]message"
						id="chat-message"
						onChange={(e) =>
							foundUser.user === 'client'
								? setInputUserValue(e.target.value)
								: setInputAuthorValue(e.target.value)
						}
						value={foundUser && foundUser.user === 'client' ? inputUserValue : inputAuthorValue}
					/>
					{inputUserValue || inputAuthorValue ? (
						<button
							className="author-chat__form--btn btn"
							type="button"
							onClick={() =>
								foundUser.user === 'client' ? setInputUserValue('') : setInputAuthorValue('')
							}
						>
							<span className="sr-only">
								{switchBtn == 0 ? 'Eingabefeld löschen' : 'Delete input field'}
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
					<button className="author-chat__btn universal--btn btn btn--red" type="submit">
						{switchBtn ? 'Senden' : 'Send'}
					</button>
				</form>
			</div>
		</>
	);
});
export default AuthorsChat;
