import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import Block from './Block';
import LikeIcon from '../../assets/images/sprite/like-icon.svg';
import MessageIcon from '../../assets/images/sprite/message-icon.svg';
import { database } from '../../firebase/firebaseConfig';
import { setModal } from '../../redux/slices/authorsInfosSlice';

const PaintingCartInfo = memo((props) => {
	const { img, id, title, lot, price, like, authorInfo, authorId, dispatch, setAuthorInfoBtn, userCli, userInfo } =
		props;
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const [itemInLikes, setItemInLikes] = useState(false)
	// const [likeToggle, setLikeToggle] = useState(false)
	const switchBtn = switchLanguageBtn[0] === 0;
	const auth = getAuth();
	const authorWork = authorInfo.works.find((item) => item.id == id);
	const workLike = authorWork.like;
	// console.log(workLike);

	// console.log(userCli.likeMe.find(item => item.idItem === id) === undefined);

	// console.log(userCli.likeMe.find(item => item.author === authorInfo.name));

	useEffect(() => {
		if ( auth.currentUser !== null && 
			userCli !== undefined && userCli.likeMe.find(item => item.author === authorInfo.name) !== undefined && userCli !== undefined && userCli.likeMe.find(item => item.idItem === id) !== undefined
			) {
				setItemInLikes(true)
			} else {
				setItemInLikes(false)
			}
	}, [userCli])

	const onPressLike = () => {
		if (auth.currentUser !== null &&
				userCli !== undefined &&
				userCli.likeMe.find(item => item.idItem === id && item.author === authorInfo.name) === undefined && itemInLikes === false ) {
			const iLikeIt = {
				id: userCli.likeMe.length + 1,
				image: img,
				title: title,
				author: authorInfo.name,
				price: price,
				lot: lot,
				date: new Date().toLocaleDateString(),
				idItem: id
			};
			const docToUpdate = doc(database, userInfo !== undefined ? 'users' : 'authors', userCli.ID);
			updateDoc(docToUpdate, {
				likeMe: arrayUnion(iLikeIt),
			})
				.then(() => {
					alert('Added to cart');
				})
				.catch((err) => {
					alert(err.message);
				});
			setItemInLikes(true)
		} else if (auth.currentUser !== null && userCli !== undefined && userCli.likeMe.find(item => item.idItem === id) !== undefined && userCli !== undefined && userCli.likeMe.find(item => item.author === authorInfo.name) !== undefined && itemInLikes === true) {
			alert('This items is already in your likes!')
			setItemInLikes(false)
		} else {
			dispatch(setModal(true));
		}
		
	};

	const onBuy = (e) => {
		e.preventDefault()
		if (auth.currentUser !== null) {
			const buyItem = {
				id: userCli.cart.length + 1,
				image: img,
				title: title,
				author: authorInfo.name,
				price: price,
				lot: lot,
				date: new Date().toLocaleDateString(),
			};
			const docToUpdate = doc(database, userInfo !== undefined && userInfo.user === 'client' ? 'users' : 'authors', userCli.ID);
			updateDoc(docToUpdate, {
				cart: arrayUnion(buyItem),
			})
				.then(() => {
					alert('Added to cart');
				})
				.catch((err) => {
					alert(err.message);
				});
		} else {
			dispatch(setModal(true));
		}
	};

	const onSuggestPrice = () => {
		if (auth.currentUser !== null) {
		} else {
			dispatch(setModal(true));
		}
	};

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
					<button
						className={`details-card__message-btn details-card__message-btn--like btn ${itemInLikes ? 'active' : ''}`}
						type="button"
						onClick={onPressLike}
					>
						<span className="sr-only">like</span>
						<svg width="18" height="18">
							<use href={`${LikeIcon}#like`}></use>
						</svg>
						<span>{like}</span>
					</button>
					<button
						className="details-card__message-btn details-card__message-btn--message btn"
						type="button"
						style={{ justifyContent: 'center' }}
						onClick={() => (dispatch(setAuthorInfoBtn(0)), dispatch(setModal(true)))}
					>
						<svg width="18" height="18">
							<use href={`${MessageIcon}#message`}></use>
						</svg>
						<span>{switchBtn ? 'Schreiben dem Autor' : 'Write to the author'}</span>
					</button>
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
							{switchBtn
								? 'Gehen Sie zum Online-Shop, wählen Sie ein Produkt aus und klicken Sie auf die Schaltfläche "Kaufen"!'
								: 'Go to the online store, select a product and press the "Buy" button!'}
						</p>
					</div>
				</div>
				<div className="details-card__btns">
					<button
						className="details-card__btns-btn details-card__btns-btn--buy btn btn--red-hover btn--universal"
						type="submit"
						onClick={(e) => onBuy(e)}
					>
						{switchBtn ? 'Kaufen' : 'Buy'}
					</button>
					<button
						className="details-card__btns-btn btn btn--universal btn--red-hover"
						type="button"
						onClick={onSuggestPrice}
					>
						{switchBtn ? 'Schlagen Sie einen Preis vor' : 'Suggest a price'}
					</button>
				</div>
			</div>
		</article>
	);
});

export default PaintingCartInfo;
