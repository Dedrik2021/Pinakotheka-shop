import { memo } from 'react';
import Block from './Block';

const PaintingCartInfo = memo((props) => {
	const { img, title, lot, price, like } = props;

	return (
		<article className="details-card">
			<div className="details-card__wrapper-img">
				<img className="details-card__img" src={img} alt={title} width="800" height="550" />
				<img
					className="details-card__img details-card__img--blur"
					src={img}
					alt={title}
					width="800"
					height="550"
				/>
			</div>
			<div className="details-card__box">
				<span className="details-card__lot">
					Lot
					<span>№</span>
					{lot}
				</span>
				<h3 className="details-card__title">{title}</h3>
				<div className="details-card__wrapper">
					<span className="details-card__statistics details-card__statistics--shared">12 315 geteilt</span>
					<span className="details-card__statistics details-card__statistics--viewing">2 315 ansehen</span>
				</div>
				<div className="details-card__message">
					<button className="details-card__message-btn details-card__message-btn--like btn" type="button">
						<span className="sr-only">like</span>
						<svg width="20" height="20">
							<use href="images/sprite.svg#like-icon"></use>
						</svg>
						<span>{like}</span>
					</button>
					<a className="details-card__message-btn details-card__message-btn--message btn" href="#">
						<svg width="20" height="20">
							<use href="images/sprite.svg#message-icon"></use>
						</svg>
						<span>Schreiben dem Autor</span>
					</a>
				</div>

				<Block items={props} />

				<div className="details-card__price">
					<span className="details-card__price-sum">
						<span>€</span>
						{price}
					</span>
					<div className="details-card__question">
						Wie kauft man?
						<p className="details-card__question-text">
							Gehen Sie zum Online-Shop, wählen Sie ein Produkt aus und kaufen Sie!
						</p>
					</div>
				</div>
				<div className="details-card__btns">
					<a
						className="details-card__btns-btn details-card__btns-btn--buy btn btn--red-hover btn--universal"
						href="#"
					>
						Kaufen
					</a>
					<a className="details-card__btns-btn btn btn--universal btn--red-hover" href="#">
						Schlagen Sie einen Preis vor
					</a>
				</div>
			</div>
		</article>
	);
});

export default PaintingCartInfo;
