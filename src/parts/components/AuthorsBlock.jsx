import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';

const AuthorsBlock = () => {
	const [authors, setAuthors] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getAuthors = async () => {
			try {
				const response = await fetch(`http://localhost:3001/items?_limit=11`);
				const data = await response.json();
				setAuthors(data);
				return data;
			} catch (error) {console.log(error);}
		};
		getAuthors();
	}, []);

	return (
		<div className="authors-list">
			<div className="container">
				<span className="authors-list__title title">Autoren</span>
				<div className="authors-list__content">
					<ul className="authors-list__list">
						{authors.map(({ id, name, img, works }) => {
							return (
								<li className="authors-list__item" key={id}>
									<article className="author-card">
										<Link
											className="author-card__img-link"
											to={`/Autor/${id}`}
											onClick={() => dispatch(setAuthorInfoBtn(0))}
										>
											<img src={img} alt={name} width="122" height="125" />

											<span className="author-card__portfolio">{works.length}</span>

											<span className="author-card__online @@online"></span>
										</Link>

										<div className="author-card__box">
											<Link className="author-card__link" to={`/Autor/${id}`}>
												<h2 className="author-card__user">{name}</h2>
											</Link>
										</div>
									</article>
								</li>
							);
						})}
					</ul>
					<Link className="authors-list__btn btn btn--red-hover" to={`/Autoren`}>
						Aussehen alle Autoren
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthorsBlock;
