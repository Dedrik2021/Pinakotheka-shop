import { memo } from 'react';
import { useSelector } from 'react-redux';

import Block from './Block';
import LikeIcon from '../../assets/images/sprite/like-icon.svg'
import MessageIcon from '../../assets/images/sprite/message-icon.svg'

const PaintingCartInfo = memo((props) => {
	const { img, title, lot, price, like } = props;
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

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
					<span className="details-card__statistics details-card__statistics--shared">
						12 315 {switchBtn ? 'geteilt' : 'share'}
					</span>
					<span className="details-card__statistics details-card__statistics--viewing">
						2 315 {switchBtn ? 'ansehen' : 'view'}
					</span>
				</div>
				<div className="details-card__message">
					<button className="details-card__message-btn details-card__message-btn--like btn" type="button">
						<span className="sr-only">like</span>
						<svg width="18" height="18">
							<use href={`${LikeIcon}#like`}></use>
						</svg>
						<span>{like}</span>
					</button>
					<a className="details-card__message-btn details-card__message-btn--message btn" href="#"
					style={{justifyContent: 'center'}}>
						<svg width="18" height="18">
							<use href={`${MessageIcon}#message`}></use>
						</svg>
						<span>
							{switchBtn ? 'Schreiben dem Autor' : 'Write to the author'}
						</span>
					</a>
				</div>

				<Block items={props} />

				<div className="details-card__price">
					<span className="details-card__price-sum">
						<span>€</span>
						{price}
					</span>
					<div className="details-card__question">
						{switchBtn ? 'Wie kauft man?' : 'How to buy?'}
						<p className="details-card__question-text">
							{switchBtn ? 'Gehen Sie zum Online-Shop, wählen Sie ein Produkt aus und kaufen Sie!' : 
							'Go to the online store, select a product and buy!'}
						</p>
					</div>
				</div>
				<div className="details-card__btns">
					<a
						className="details-card__btns-btn details-card__btns-btn--buy btn btn--red-hover btn--universal"
						href="#"
					>
						{switchBtn ? 'Kaufen' : 'Buy'}
					</a>
					<a className="details-card__btns-btn btn btn--universal btn--red-hover" href="#">
						{switchBtn ? 'Schlagen Sie einen Preis vor' : 'Suggest a price'}
					</a>
				</div>
			</div>
		</article>
	);
});

export default PaintingCartInfo;
