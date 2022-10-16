import React, { memo, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import logo from '../../assets/images/content/logo.svg';
import background from '../../assets/images/content/error-404.png';
import backgroundBlur from '../../assets/images/content/error-404.png';
import { database } from '../../firebase/firebaseConfig';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import { setShowUserInfo } from '../../redux/slices/userSlice';
import CaretIcon from '../../assets/images/sprite/caret-icon.svg';
import { setModal } from '../../redux/slices/authorsInfosSlice';

const Reviews = memo(({ authorInfo }) => {
	const auth = getAuth();
	const dispatch = useDispatch();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const [deleteItem, setDeleteItem] = useState(false);
	const [itemId, setItemId] = useState();

	const onUserLink = (userInfo) => {
		const docToUpdate = doc(database, 'showUserInfo', 'IezwG0ZPPzWGDNIxTiUI');
		updateDoc(docToUpdate, {
			user: userInfo,
		}).catch((err) => {
			alert(err.message);
		});
	};

	const onDeleteMessage = (id) => {
		const collectionReff = doc(database, 'authors', authorInfo.ID);
		const docToDelete = authorInfo.feedBack.find((item) => item.id == id);

		if (window.confirm('Do you want to delite this message? Are you sure?')) {
			updateDoc(collectionReff, {
				feedBack: arrayRemove(docToDelete),
			});
		}
	};

	const message = () => {
		if (authorInfo !== null) {
			return (
				authorInfo &&
				authorInfo.feedBack.map((item, i) => {
					return (
						<li className={`reviews__item`} key={i}>
							<article className="user-message">
								<Link
									className="user-message__link"
									to={`${
										auth.currentUser !== null
											? switchBtn
												? '/PersonlichesBuro'
												: '/PersonalOffice'
											: ''
									}`}
									onClick={() => (
										onUserLink(item),
										auth.currentUser === null && dispatch(setModal(true))
									)}
								>
									<div className="user-message__img-wrapper">
										<img src={item.avatar} alt={item.name} />
									</div>
								</Link>
								<div className="user-message__wrapper">
									<div className="user-message__wrapper-box">
										<time>
											{item.timeToSend}
											<span className="user-message__slash">/</span>
											<span>{item.data}</span>
										</time>
										<div className="user-message__box">
											<Link
												className="user-message__link user-message__link--name"
												to={`${
													auth.currentUser !== null
														? switchBtn
															? '/PersonlichesBuro'
															: '/PersonalOffice'
														: ''
												}`}
												onClick={() => (
													onUserLink(item),
													auth.currentUser === null &&
														dispatch(setModal(true))
												)}
											>
												<span>{item.name}</span>
											</Link>
										</div>
									</div>
									<div className="user-message__text">
										<p className={itemId === item.id ? 'active' : ''}>
											{item.message}
										</p>
									</div>
									<div className="user-message__wrapper-btns">
										{item.message.length > 300 && (
											<button
												className={`user-message__btn btn btn--universal btn--red ${
													itemId === item.id ? 'active' : ''
												}`}
												type="button"
												onClick={() => setItemId(item.id)}
											>
												{itemId === item.id
													? `${
															switchBtn
																? 'Alle Nachrichten'
																: 'All message'
													  }`
													: `${
															switchBtn
																? 'Mehr anzeigen'
																: 'Show more'
													  }`}
												<svg width="20" height="20">
													<use href={`${CaretIcon}#caret`}></use>
												</svg>
											</button>
										)}
										<button
											className="user-message__delete btn btn--universal"
											onClick={() => onDeleteMessage(item.id)}
											type={'button'}
										>
											Delete
										</button>
									</div>
								</div>
							</article>
						</li>
					);
				})
			);
		} else {
			return (
				<>
					<section className="error-404">
						<div className="container">
							<div
								className="error-404__bg"
								style={{
									backgroundImage: `url(${background})`,
								}}
							>
								<div
									className="error-404__blur blur"
									style={{
										backgroundImage: `url(${backgroundBlur})`,
									}}
								></div>
								<span className="error-404__bg-color"></span>
								<div className="error-404__box">
									<img
										className="error-404__logo"
										width={200}
										height={50}
										src={logo}
										alt="logo"
									/>
									<h1 className="error-404__title title">
										{switchBtn ? 'Keine Bewertungen' : 'No reviews'}
									</h1>
									<div className="error-404__text">
										<p>
											{switchBtn
												? 'Hinterlassen Sie Ihre Nachricht'
												: 'Leave your message'}
										</p>
									</div>
									<button
										className="error-404__btn btn btn--red btn--universal"
										type="button"
										onClick={() => dispatch(setAuthorInfoBtn(0))}
									>
										{switchBtn ? 'Feedback hinterlassen' : 'leave a review'}
									</button>
									<a className="error-404__link more-link" href="/">
										{switchBtn ? 'Zurück zur Hauptseite' : 'Back to the HOME'}
									</a>
								</div>
							</div>
						</div>
					</section>
				</>
			);
		}
	};

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}
				/>
				<title>{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}</title>
			</Helmet>
			<section className="authors-works">
				<span className="sr-only">
					{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}
				</span>
				<div className="authors-works__content">
					{/* <h1 className="authors-works__title title">
						{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}
					</h1> */}
					<ul className="reviews__list">
						{message()}
						{/* {authorsMessages.map((item, i) => {
							return (
								<li className="reviews__item" key={i}>
									<article className="user">
										<img src={item.avatar} alt={item.name} />
										<div className="user__box">
											<span>{item.name}</span>
											<div>
												<p>{item.message}</p>
											</div>
										</div>
									</article>
								</li>
							);
						})} */}
					</ul>
				</div>
			</section>
		</>
	);
});

export default Reviews;
