import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import unknowImg from '../../assets/images/content/unknow-photo.png';
import AuthorsBlockSkeleton from '../../skeletons/authorsBlockSkeleton';

const AuthorsBlock = () => {
	// const [authors, setAuthors] = useState([]);
	const auth = getAuth();
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.authorsInfos.modal);
	const { authors, authorsStatus } = useSelector((state) => state.authorsInfos);
	const foundUser = useSelector((state) => state.user.foundUser);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	// console.log(authors);
	// const userOnline = authors.find
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
			return [...new Array(11)].map((_, i) => <AuthorsBlockSkeleton key={i} />);
		} else {
			return (
				<>
					{authors.map((item) => {
						
						return (
							<li className="authors-list__item" key={item.id}>
								<article className="author-card">
									<Link
										className="author-card__img-link"
										to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
										onClick={() => dispatch(setAuthorInfoBtn(0))}
									>
										<img
											src={item.img !== undefined ? item.img : unknowImg}
											alt={item.name}
											width="122"
											height="125"
										/>

										<span className="author-card__portfolio">{item.works.length}</span>

										<span className={`author-card__online ${foundUser !== undefined && item.emailId === foundUser.emailId ? 'active' : ''}`}></span>
										
									</Link>

									<div className="author-card__box">
										<Link
											className="author-card__link"
											to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
											onClick={() => dispatch(setAuthorInfoBtn(0))}
										>
											<h2 className="author-card__user">{item.name}</h2>
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
					<ul className="authors-list__list">{authorsItems()}</ul>
					<Link className="authors-list__btn btn btn--red-hover" to={switchBtn ? `/Autoren` : '/Authors'}>
						Aussehen alle Autoren
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthorsBlock;
