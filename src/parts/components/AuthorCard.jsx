import { Link } from 'react-router-dom';

import Social from './Social';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

const AuthorCard = memo((props) => {
	const { name, tel, id, img } = props;
	const dispatch = useDispatch();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	return (
		<article className="author-card">
			<Link 
				className="author-card__img-link" 
				to={`${switchBtn ? '/Autor' : '/Author'}/${id}`} 
				onClick={() => dispatch(setAuthorInfoBtn(0))}
				>
				<img src={img} alt={name} width="122" height="125" />

				<span className="author-card__online @@online"></span>
			</Link>

			<div className="author-card__box">
				<Link 
					className="author-card__link" 
					to={`${switchBtn ? '/Autor' : '/Author'}/${id}`} 
					onClick={() => dispatch(setAuthorInfoBtn(0))}>
					<h2 className="author-card__user">{name}</h2>
				</Link>

				<a className="author-card__link author-card__link--tel" href="tel:@@href">
					{tel}
				</a>

				<Social />
			</div>
		</article>
	);
});

export default AuthorCard;
