import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

import { changeSinglePainting } from '../../redux/slices/authorsInfosSlice';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import FavoriteIcon from '../../assets/images/sprite/favorit-icon.svg';
import ShareIcon from '../../assets/images/sprite/share-icon.svg';

const PaintingCard = memo((props) => {
	const { works } = props;

	const content = works.map((item) => <Painting key={item.id} item={item} props={props} />);

	return <>{content}</>;
});

const Painting = memo(({ item, props }) => {
	const dispatch = useDispatch();

	const onAuthorInfo = () => {
		const findPainting = {
			painting: item.id,
		};
		dispatch(setAuthorInfoBtn(0));
		dispatch(changeSinglePainting({ findPainting }));
	};

	return (
		<li className="gallery__item">
			<article className="painting-card" tabIndex="0">
				<Link
					className="painting-card__img-link"
					to={`/Autor/Einzelmalerei/${props.id}`}
					onClick={() => onAuthorInfo()}
				>
					<img src={item.img} alt={item.title} />
				</Link>
				<Link
					className="painting-card__link"
					onClick={() => onAuthorInfo()}
					to={`/Autor/Einzelmalerei/${props.id}`}
				>
					<h3 className="painting-card__title">{item.title}</h3>
				</Link>
				<div className="painting-card__box">
					<div className="painting-card__wrapper">
						<Link
							className="painting-card__author-link"
							to={`/Autor/${props.id}`}
							onClick={() => onAuthorInfo()}
						>
							<span>{props.name}</span>
						</Link>
						<span className="painting-card__material">{item.material}</span>
					</div>
					<div className="painting-card__rating">
						<div className="painting-card__stars"></div>

						<span className="painting-card__price">
							{item.price}
							<span>€</span>
						</span>
					</div>

					<div className="painting-card__buy">
						<a className="painting-card__btn btn btn--universal btn--red-hover" href="#">
							Kaufen
						</a>
						<a className="painting-card__btn painting-card__btn--share btn btn--red-hover" href="#">
							<span className="sr-only">share</span>
							<svg width="18" height="18">
								<use href={`${ShareIcon}#share`}></use>
							</svg>
						</a>
						<button
							className="painting-card__btn painting-card__btn--favorite btn btn--red-hover"
							type="button"
						>
							<span className="sr-only">added to favorite pick</span>
							<svg width="22" height="18">
								<use href={`${FavoriteIcon}#favourite`}></use>
							</svg>
						</button>
					</div>
				</div>
			</article>
		</li>
	);
});

export default PaintingCard;
