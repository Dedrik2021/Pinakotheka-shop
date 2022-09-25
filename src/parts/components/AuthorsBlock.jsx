import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import unknowImg from '../../assets/images/content/unknow-photo.png';
import AuthorsBlockSkeleton from '../../skeletons/authorsBlockSkeleton';

const AuthorsBlock = () => {
	// const [authors, setAuthors] = useState([]);
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.authorsInfos.modal);
	const { authors, authorsStatus } = useSelector((state) => state.authorsInfos);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	// useEffect(() => {
	// 	const getAuthors = async () => {
	// 		try {
	// 			const response = await fetch(`http://localhost:3001/items?_limit=11`);
	// 			const data = await response.json();
	// 			setAuthors(data);
	// 			return data;
	// 		} catch (error) {console.log(error);}
	// 	};
	// 	getAuthors();
	// }, []);

	const authorsItems = () => {
		if (authorsStatus === 'loading' || authorsStatus === 'error') {
			return ([...new Array(11)].map((_, i) => <AuthorsBlockSkeleton key={i} />))
		} else {
			return (
				<>
					{authors.map(({ id, name, img, works }) => {
						return (
							<li className="authors-list__item" key={id}>
								<article className="author-card">
									<Link
										className="author-card__img-link"
										to={`${switchBtn ? '/Autor' : '/Author'}/${id}`}
										onClick={() => dispatch(setAuthorInfoBtn(0))}
									>
										<img
											src={img !== undefined ? img : unknowImg}
											alt={name}
											width="122"
											height="125"
										/>

										<span className="author-card__portfolio">{works.length}</span>

										<span className="author-card__online @@online"></span>
									</Link>

									<div className="author-card__box">
										<Link
											className="author-card__link"
											to={`${switchBtn ? '/Autor' : '/Author'}/${id}`}
										>
											<h2 className="author-card__user">{name}</h2>
										</Link>
									</div>
								</article>
							</li>
						);
					})}
				</>
			);
		}
	};

	return (
		<div className={`authors-list ${modal ? 'active' : ''}`}>
			<div className="container">
				<span className="authors-list__title title">{switchBtn ? 'Autoren' : 'Authors'}</span>
				<div className="authors-list__content">
					<ul className="authors-list__list">
						{authorsItems()}
					</ul>
					<Link className="authors-list__btn btn btn--red-hover" to={switchBtn ? `/Autoren` : '/Authors'}>
						Aussehen alle Autoren
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthorsBlock;
