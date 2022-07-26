import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection } from 'firebase/firestore/lite';

import BreadCrumbs from '../components/BreadCrumbs';
import AuthorsWorks from '../components/AuthorsWorks';
import AuthorsBio from '../components/AuthorsBio';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import { fetchAuthorInfo, setModal } from '../../redux/slices/authorsInfosSlice';
import AuthorsBioSkeleton from '../../skeletons/autorsBioSkeleton';
import GallerySkeleton from '../../skeletons/gallerySkeleton';
import Reviews from '../components/Reviews';
import ReviewsSkeleton from '../../skeletons/reviewsSkeleton';
import AuthorsChat from '../components/AuthorsChat';
import { database } from '../../firebase/firebaseConfig';

const AboutAuthorPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const auth = getAuth();
	// const [authors, setAuthors] = useState([])
	const collectionRef = collection(database, 'authors');
	const authorInfoBtn = useSelector((state) => state.filters.authorInfoBtn);
	const { modal, authors } = useSelector((state) => state.authorsInfos);
	// const authors = useSelector((state) => state.authorsInfos.authorsAll);
	const foundUser = useSelector((state) => state.user.foundUser);
	const { authorsStatus } = useSelector((state) => state.authorsInfos);
	const userId = auth.currentUser;
	// const foundUser = foundUserId !== null ? data.find((item) => item.emailId == foundUserId.email) : null

	const dataAuthor =
		userId !== null ? authors.find((item) => item.emailId === userId.email) : null;
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const authorInfo = authors.find((item) => item.id == id);
	const switchBtn = switchLanguageBtn[0] === 0;

	const aboutBtn = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Identity of the person' },
		{ id: 1, title: switchBtn ? 'Gemälde zum Verkauf' : 'Paintings for Sale' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'Review' },
		{ id: 3, title: 'Chat' },
	];

	// useEffect(() => {
	// 	getDocs(collectionRef).then((response) => {
	// 		const data = response.docs.map((item) => {
	// 			return { ...item.data(), ID: item.id };
	// 		})
	// 		setAuthors(data)
	// 	});
	// }, [authors])

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = switchBtn
			? window.location.pathname.substring(1, 6)
			: window.location.pathname.substring(1, 7);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchAuthorInfo({ authorId: id }));
	}, [id]);

	const authorsBio =
		authorsStatus === 'loading' || authorsStatus === 'error' ? (
			<AuthorsBioSkeleton />
		) : (
			<AuthorsBio
				authorInfo={authorInfo}
				setAuthorInfoBtn={setAuthorInfoBtn}
				setModal={setModal}
				user={foundUser}
			/>
		);

	const authorsWorks =
		authorsStatus === 'loading' || authorsStatus === 'error' ? (
			<div className="container" style={{ paddingTop: '60px' }}>
				{[...new Array(12)].map((_, i) => (
					<GallerySkeleton key={i} />
				))}
			</div>
		) : (
			<AuthorsWorks authorsWorks={authorInfo} />
		);
	// const changeModal = () => {
	// 	if (foundUser != null) {

	// 		return <ReviewModal
	// 			closeModal={setModal}
	// 			foundUser={foundUser}
	// 			authorInfo={authorInfo}

	// 			authorID={dataAuthor}
	// 			id={id}
	// 			/>
	// 	} else {
	// 		return <Modal closeModal={setModal}/>
	// 	}

	// }

	const reviews =
		authorsStatus === 'loading' || authorsStatus === 'error' ? (
			<div className="authors-works__content">
				{[...new Array(10)].map((_, i) => (
					<ReviewsSkeleton key={i} />
				))}
			</div>
		) : (
			<Reviews authorInfo={authorInfo} />
		);

	const showContent = () => {
		switch (authorInfoBtn) {
			case 0:
				return authorsBio;
			case 1:
				return authorsWorks;
			case 2:
				return reviews;
			case 3:
				return <AuthorsChat authorInfo={authorInfo} />;
			default:
				return authorsBio;
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className={`about-author ${modal && foundUser == null ? 'active' : ''}`}>
				<div className={`about-author__inner`}>
					<div className={`about-author__shadow ${modal ? 'active' : ''}`}></div>
					<div className="about-author__aside">
						<ul className="authors-items__list">
							{aboutBtn.map(({ id, title }) => {
								return (
									<li className="authors-items__item" key={id}>
										<button
											className={`authors-items__btn btn btn--red btn--universal ${
												authorInfoBtn === id ? 'btn--active' : ''
											}`}
											type="button"
											onClick={() => dispatch(setAuthorInfoBtn(id))}
										>
											{title}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					{showContent()}
				</div>
			</div>
		</div>
	);
};

export default AboutAuthorPage;
