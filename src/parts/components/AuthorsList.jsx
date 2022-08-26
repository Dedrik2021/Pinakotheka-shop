import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';

const AuthorsList = memo((props) => {
    const {
        authors,
        onPainting
    } = props
    const dispatch = useDispatch()
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0
    
	return (
		<ul className="authors__list">
			{authors.map(({ id, img, name, works, feedBack }) => {
				const shortWorks = works.splice(0, 4);

				return (
					<li className="authors__item" key={id}>
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
									onClick={() => dispatch(setAuthorInfoBtn(0))}
								>
									<h2 className="author-card__user">{name}</h2>
								</Link>
								<div className="author-card__rating">
									<div className="author-card__stars"></div>
									<span>rating</span>
								</div>
								<div className="author-card__wrapper">
									<Link
										className="author-card__portfolio author-card__portfolio--reviews"
										onClick={() => dispatch(setAuthorInfoBtn(2))}
										to={`${switchBtn ? '/Autor' : '/Author'}/${id}`}
									>
										<span>{feedBack.length}</span>
									</Link>
									<Link
										className="author-card__portfolio"
										onClick={() => dispatch(setAuthorInfoBtn(1))}
										to={`${switchBtn ? '/Autor' : '/Author'}/${id}`}
									>
										<span>{works.length}</span>
									</Link>
								</div>
								<ul className="author-painting">
									{shortWorks.map((item) => {
										return (
											<li className="author-painting__item" key={item.id}>
												<Link
													className="author-painting__link"
													to={`/Autor/Einzelmalerei/${id}`}
													onClick={() => onPainting(item.id)}
												>
													<img src={item.img} alt={item.title} height="92" width="92" />
												</Link>
											</li>
										);
									})}
									<li className="author-painting__item">
										<Link
											className="author-painting__link"
											onClick={() => dispatch(setAuthorInfoBtn(1))}
											to={`${switchBtn ? '/Autor' : '/Author'}/${id}`}
										>
											Alle Werke ansehen
										</Link>
									</li>
								</ul>
							</div>
						</article>
					</li>
				);
			})}
		</ul>
	);
});

export default AuthorsList;
