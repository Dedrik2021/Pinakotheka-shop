import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore/lite';
import { ref, set, get, child, update, remove, push, onValue, orderByChild, query, startAt, limitToFirst } from 'firebase/database';

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
import ReviewModal from '../components/ReviewModal';
import AuthorsChat from '../components/AuthorsChat';
import Modal from '../components/Modal';
import { database, realDb } from '../../firebase/firebaseConfig';
import Spinner from '../../spinner/Spinner';
import ShowModal from '../components/ShowModal';

const AboutAuthorPage = () => {
	const [authorsData, setAuthorsData] = useState([]);
	// const [dataAuthor, setDataAuthor] = useState({})
	const [authorsMessages, setAuthorsMessages] = useState([])
	const [loading, setLoading] = useState(false)

	const { id } = useParams();
	const dispatch = useDispatch();
	const authorInfoBtn = useSelector((state) => state.filters.authorInfoBtn);
	const { authorInfo, statusAuthorInfo, modal } = useSelector((state) => state.authorsInfos);
	const data = useSelector((state) => state.user.users);
	const {authors, authorsStatus} = useSelector(state => state.authorsInfos)
	const auth = getAuth();
	const userId = auth.currentUser;
	const user = userId !== null ? data.find((item) => item.emailId == userId.email) : null
	const collectionRealDb = ref(realDb, `usersMessages/ ${id}`);

	const collectionRef = collection(database, 'authors')
	const dataAuthor = userId !== null ? authors.find(item => item.emailId === userId.email) : null
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);

	const switchBtn = switchLanguageBtn[0] === 0;

	// const path = window.location.pathname
	// // path != `/Author/${id}` ? dispatch(setAuthorInfoBtn(0)) : null
	// console.log(path === `/Author/${id}`);
	// // const collectionRealDb = ref(realDb, dataAuthor.ID)

	const aboutBtn = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Identity of the person' },
		{ id: 1, title: switchBtn ? 'Gemälde zum Verkauf' : 'Paintings for Sale' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'Review' },
		{ id: 3, title: 'Chat' },
	];

	// useEffect(() => {
	// 	onValue(collectionRealDb, (snapshot) => {
	// 		if (snapshot.exists()) {
	// 			setAuthorsMessages(Object.values(snapshot.val()));
	// 		}
	// 	});
		
	// }, []);

	useEffect(() => {
		// const getData = async () => {
		// 	setLoading(true)
		// 	await getDocs(collectionRef).then((response) => {
		// 		const dataAuthors = response.docs.map((item) => {
		// 			return {...item.data(), ID: item.id}
		// 		})
		// 		setAuthorsData(dataAuthors)
		// 	});
		// 	setLoading(false)
		// }
		// getData()
		
		// onValue(collectionRealDb, (snapshot) => {
        //     if (snapshot.exists()) {
        //         setAuthorsMessages(Object.values(snapshot.val()))
        //     }
        // })

		const topUserPostsRef = query(ref(realDb, `usersMessages/ ${id}`), limitToFirst(10))
		get(topUserPostsRef)
		.then((snapshot) => {
			let users = []
			snapshot.forEach(childSnapshot => {
				users.push(childSnapshot.val())
			})
			setAuthorsMessages(users)
		})
	}, [collectionRef]);

	// console.log(id);
	// console.log(dataAuthor);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = 
			switchBtn ? window.location.pathname.substring(1, 6) :
			window.location.pathname.substring(1, 7)
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchAuthorInfo({ authorId: id }));
	}, [id]);


	const authorsBio =
		statusAuthorInfo === 'loading' ? (
			<AuthorsBioSkeleton />
		) : (
			<AuthorsBio
				authorInfo={authorInfo}
				setAuthorInfoBtn={setAuthorInfoBtn}
				setModal={setModal}
				user={user}
				authorsMessages={authorsMessages}
				// changeModal={changeModal}
			/>
		);

	const authorsWorks =
		statusAuthorInfo === 'loading' ? (
			<div className="container" style={{ paddingTop: '60px' }}>
				{[...new Array(12)].map((_, i) => (
					<GallerySkeleton key={i} />
				))}
			</div>
		) : (
			<AuthorsWorks authorsWorks={authorInfo} />
		);
		
	// const changeModal = () => {
	// 	if (user !== null) {
	// 		return <ReviewModal 
	// 			closeModal={setModal} 
	// 			user={user}
	// 			authorInfo={authorInfo}
	// 			// authorID={dataAuthor}
	// 			// id={id}
	// 			/>
	// 	} else {
	// 		return <Modal closeModal={setModal}/>
	// 	}
	// 	return <ShowModal closeModal={setModal} authorInfo={authorInfo} user={userId} />
	// } 

	const reviews = 
			statusAuthorInfo === 'loading' ? (
				<div className="authors-works__content">
					{[...new Array(10)].map((_, i) => (
						<ReviewsSkeleton key={i} />
					))}
				</div>
			) : (
				<Reviews 
					reviews={authorInfo} 
					// changeModal={changeModal} 
					id={id} 
					authorsMessages={authorsMessages} 

					/>
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
				return <AuthorsChat />;
			default:
				return authorsBio;
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className={`about-author ${modal && user == null ? 'active' : ''}`}>
				<div className={`about-author__inner`}>
					<div className={`about-author__shadow ${modal ? 'active' : ''}`}>
						{/* {modal && <ShowModal closeModal={setModal} user={userId} authorInfo={authorInfo}/>}	 */}
						{modal && (userId !== null || dataAuthor !== undefined) ? <ReviewModal 
				closeModal={setModal} 
				userAuth={userId}
				user={user}
				authorInfo={authorInfo}
				// authorID={dataAuthor}
				// id={id}
				/>  : null}	
					</div>
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
