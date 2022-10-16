import { memo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { getAuth } from 'firebase/auth';

import { changeSinglePainting } from '../../redux/slices/authorsInfosSlice';
import logo from '../../assets/images/content/logo.svg';
import background from '../../assets/images/content/error-404.png';
import backgroundBlur from '../../assets/images/content/error-404.png';
import CreateProduct from '../pages/CreateProduct';

const AuthorsWorks = memo(({ authorsWorks }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const auth = getAuth();
	const [createBtn, setCreateBtn] = useState(false);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const foundAuthor = authorsWorks.emailId === auth.currentUser.email;

	const onPainting = (id) => {
		const findPainting = {
			painting: id,
		};
		dispatch(changeSinglePainting({ findPainting }));
	};

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Werke das Autors' : 'Works of the author'}
				/>
				<title>{switchBtn ? 'Werke das Autors' : 'Works of the author'}</title>
			</Helmet>
			<section className="authors-works">
				<h1 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h1>
				<div className="authors-works__content">
					{createBtn ? (
						<CreateProduct />
					) : (
						<>
							{foundAuthor && (
								<div className="authors-works__btns-wrapper">
									<button
										className="authors-works__btn btn btn--red btn--universal"
										type="button"
										onClick={() => setCreateBtn(true)}
									>
										Create a new product
									</button>
								</div>
							)}
							{authorsWorks.works.length !== 0 ? (
								<ul className="gallery__list cards-list">
									{authorsWorks &&
										authorsWorks.works.map((item) => {
											return (
												<li className="gallery__item" key={item.id}>
													<article className="painting-card" tabIndex="0">
														<Link
															className="painting-card__img-link"
															to={`${
																switchBtn
																	? '/Autor/Einzelmalerei'
																	: '/Author/SinglePainting'
															}/${id}`}
															onClick={() => onPainting(item.id)}
														>
															<img src={item.img} alt={item.title} />
														</Link>
														<Link
															className="painting-card__link"
															to={`${
																switchBtn
																	? '/Autor/Einzelmalerei'
																	: '/Author/SinglePainting'
															}/${id}`}
															onClick={() => onPainting(item.id)}
														>
															<h3 className="painting-card__title">
																{item.title}
															</h3>
														</Link>
														<div className="painting-card__box">
															<div className="painting-card__wrapper">
																<span className="painting-card__price">
																	Price:
																</span>
																<span className="painting-card__price">
																	{item.price} €
																</span>
															</div>
															<button className="painting-card__btn btn btn--universal btn--red-hover">
																{switchBtn ? 'Kaufen' : 'Buy'}
															</button>
														</div>
													</article>
												</li>
											);
										})}
								</ul>
							) : (
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
													{switchBtn ? 'Keine Arbeiten' : 'No works'}
												</h1>
												{foundAuthor && (
													<>
														<div className="error-404__text">
															<p>
																{switchBtn
																	? 'Erstellen Sie Ihre erste Arbeit'
																	: 'Create your first work'}
															</p>
														</div>
														<button
															className="error-404__btn btn btn--red btn--universal"
															onClick={() => setCreateBtn(true)}
														>
															{switchBtn
																? 'Ein neues Produkt erstellen'
																: 'Create a new product'}
														</button>
													</>
												)}
												<Link className="error-404__link more-link" to="/">
													{switchBtn
														? 'Zurück zur Hauptseite'
														: 'Back to the HOME'}
												</Link>
											</div>
										</div>
									</div>
								</section>
							)}
						</>
					)}
				</div>
			</section>
		</>
	);
});

export default AuthorsWorks;
