import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setSinglePainting } from '../../redux/slices/authorsInfosSlice';

const GalleryList = memo(({ authorsWorks, id }) => {
	const dispatch = useDispatch();
	return (
		<ul className="gallery__list cards-list">
			{authorsWorks.works.map(({ img, title, price }, i) => {
				return (
					<li className="gallery__item" key={i}>
						<article className="painting-card" tabIndex="0">
							<Link
								className="painting-card__img-link"
								to={`/AutorenWerke/Einzelmalerei/${id}`}
								onClick={() => dispatch(setSinglePainting(i))}
							>
								<img src={img} />
							</Link>
							<Link
								className="painting-card__link"
								to={`/AutorenWerke/Einzelmalerei/${id}`}
								onClick={() => dispatch(setSinglePainting(i))}
							>
								<h3 className="painting-card__title">{title}</h3>
							</Link>
							<div className="painting-card__box">
								<div className="painting-card__wrapper">
									<span className="painting-card__price">Price:</span>
									<span className="painting-card__price">{price} €</span>
								</div>
								<button className="painting-card__btn btn btn--universal btn--red-hover">Kaufen</button>
							</div>
						</article>
					</li>
				);
			})}
		</ul>
	);
});

export default GalleryList;
