import { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { changeSinglePainting } from '../../redux/slices/authorsInfosSlice';

const AuthorsWorks = memo(({ authorsWorks }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0
	
	const onPainting = (id) => {
		const findPainting = {
			painting: id,
		};
		dispatch(changeSinglePainting({findPainting}));
	};

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Werke das Autors' : 'Works of the author'} />
				<title>
					{switchBtn ? 'Werke das Autors' : 'Works of the author'}
				</title>
			</Helmet>
			<section className="authors-works">
				<h1 className="sr-only">
					{switchBtn ? 'Autoren Produkte' : 'Author Products'}
				</h1>
				<div className="authors-works__content">
					<ul className="gallery__list cards-list">
						{authorsWorks && authorsWorks.works.map((item) => {
							return (
								<li className="gallery__item" key={item.id}>
									<article className="painting-card" tabIndex="0">
										<Link
											className="painting-card__img-link"
											to={`${switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'}/${id}`}
											onClick={() => onPainting(item.id)}
										>
											<img src={item.img} alt={item.title}/>
										</Link>
										<Link
											className="painting-card__link"
											to={`${switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'}/${id}`}
											onClick={() => onPainting(item.id)}
										>
											<h3 className="painting-card__title">{item.title}</h3>
										</Link>
										<div className="painting-card__box">
											<div className="painting-card__wrapper">
												<span className="painting-card__price">Price:</span>
												<span className="painting-card__price">{item.price} €</span>
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
				</div>
			</section>
		</>
	);
});

export default AuthorsWorks;
