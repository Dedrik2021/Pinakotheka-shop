import React, { memo, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { ref, set, get, child, update, remove, push, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/images/content/logo.svg';
import background from '../../assets/images/content/error-404.png';
import backgroundBlur from '../../assets/images/content/error-404.png';
import { database, realDb } from '../../firebase/firebaseConfig';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import { setUserChanged } from '../../redux/slices/userSlice';

const Reviews = memo(({ reviews, changeModal, authorsMessages, id }) => {
	const dispatch = useDispatch();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const message = () => {
		if (authorsMessages != '') {
			return authorsMessages.map((item, i) => {

				return (
					<li className="reviews__item" key={i}>
						<article className="user-message">
							<Link 
							className="user-message__link" 
							to={`${switchBtn ? '/PersonlichesBuro' : '/PersonalOffice'}`}
							onClick={() => dispatch(setUserChanged(item))}
							>
								<div className="user-message__img-wrapper">
									<img src={item.avatar} alt={item.name} />
								</div>
							</Link>
							<div className="user-message__wrapper">
								<time>
									{item.time}
									<span className='user-message__slash' >/</span>
									<span>{item.date}</span>
								</time>
								<div className="user-message__box">
									<Link 

										className="user-message__link user-message__link--name" 
										to={`${switchBtn ? '/PersonlichesBuro' : '/PersonalOffice'}`}
										>
										<span>{item.name}</span>
									</Link>
									<div className="user-message__text">
										<p>{item.message}</p>
									</div>
								</div>
							</div>
						</article>
					</li>
				);
			});
		} else {
			return (
				<>
					<section className="error-404">
						<div className="container">
							<div className="error-404__bg" style={{ backgroundImage: `url(${background})` }}>
								<div
									className="error-404__blur blur"
									style={{ backgroundImage: `url(${backgroundBlur})` }}
								></div>
								<span className="error-404__bg-color"></span>
								<div className="error-404__box">
									<img className="error-404__logo" width={200} height={50} src={logo} alt="logo" />
									<h1 className="error-404__title title">
										{switchBtn ? 'Keine Bewertungen' : 'No reviews'}
									</h1>
									<div className="error-404__text">
										<p>{switchBtn ? 'Hinterlassen Sie Ihre Nachricht' : 'Leave your message'}</p>
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
				<meta name="description" content={switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'} />
				<title>{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}</title>
			</Helmet>
			<section className="authors-works">
				<span className="sr-only">{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}</span>
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
