import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	startAt,
	doc,
	getDoc,
	endBefore,
	limitToLast,
	endAt,
} from 'firebase/firestore/lite';

import BreadCrumbs from '../components/BreadCrumbs';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import NewsSkeleton from '../../skeletons/newsSkeleton';
import { database, realDb } from '../../firebase/firebaseConfig';
// import { fetchUserData } from '../../redux/slices/userSlice';

const News = () => {
	const [news, setNews] = useState([]);
	const [pageCount, setPageCount] = useState(1);
	const [dataSelected, setDataSelected] = useState(1);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const [userArray, setUserArray] = useState([]);
	const [getUsers, setGetUsers] = useState([]);

	const [firstDocs, setFirstDocs] = useState();
	const [lastDocs, setLastDocs] = useState();
	const [newsLength, setNewsLength] = useState();
	const collectionRef = collection(database, 'news');
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const auth = getAuth();
	const user = auth.currentUser;

	// useEffect(() => {
	// 	getData();
	// 	window.scrollTo(0, 0);
	// }, []);

	// const getData = async () => {
	// 	const collectionQuery = query(collectionRef, orderBy('id', 'asc'), limit(11));
	// 	updateState(collectionQuery);

	// 	// const data = await getDocs(collectionQuery);
	// 	// const newsData = data.docs.map((item) => {
	// 	// 	return item.data();
	// 	// });
	// 	// setNews(newsData);
	// };

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 12);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (snapshot) => {
	// 		if (snapshot) {
	// 			onValue(ref(realDb, 'usersIdentify'), (snapshot) => {
	// 				if (snapshot.exists()) {
	// 					setUserArray(Object.values(snapshot.val()))
	// 				}
	// 			});
	// 		}
	// 	});
	// },[])

	// useEffect(() => {
	// 	let el = []
	// 	for (const item of userArray) {
	// 		for (const i in item) {
	// 			if (Object.hasOwnProperty.call(item, i)) {
	// 				el.push(item[i]);
	// 			}
	// 		}
	// 	}
	// 	setGetUsers(el)
	// },[userArray])

	// const dataUsers = getUsers.map(item => {
	// 	return item.user
	// })

	// console.log(getUsers.filter((el) => el.user === 'author'));

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, []);

	const getData = async () => {
		const collectionQuery = query(collectionRef, orderBy('id', 'desc'), limit(11));
		updateState(collectionQuery);
	};

	// useEffect(() => {
		
	// }, [user]);

	const showCreateNewsBtn = () => {
		return (
			<Link
				className="single-news__edit-btn btn btn--red btn--universal"
				to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
			>
				Create news
			</Link>
		);
	};

	const createBtn = user != null ? showCreateNewsBtn() : null;

	// const createBtn = user ? (
	// 	<Link
	// 			className="single-news__edit-btn btn btn--red btn--universal"
	// 			to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
	// 		>
	// 			Create news
	// 		</Link>
	// ) : null

	// const fetchNews = async (currentPage) => {
	// 	setLoading(true);
	// 	const response = await fetch(`http://localhost:3001/news?_page=${currentPage}&_limit=11`);
	// 	const data = await response.json();
	// 	setNews(data);
	// 	const total = response.headers.get('x-total-count');
	// 	setPageCount(Math.ceil(total / 11));
	// 	setLoading(false);
	// 	return data;
	// };

	const updateState = async (collectionQuery) => {
		setLoading(true);
		const data = await getDocs(collectionQuery);
		const newsData = data.docs.map((item) => {
			return item.data();
		});
		const lastDoc = data.docs[data.docs.length - 1];
		setNews(newsData);
		setLastDocs(lastDoc);

		const total = await getDocs(collectionRef);
		const totalLength = total.docs.map((item) => {
			return item.data();
		});
		setNewsLength(totalLength.length);
		setPageCount(Math.ceil(totalLength.length / 11));
		setLoading(false);
		return newsData;
	};

	const onCurrentPage = async (newsData) => {
		let currentPage = newsData.selected + 1;
		setDataSelected(currentPage);

		if (newsData.isNext) {
			const collectionQuery = query(collectionRef, orderBy('id', 'asc'), startAfter(lastDocs), limit(11));
			updateState(collectionQuery);
		} else if (newsData.isPrevious) {
			//??????????????????????????????
		}
	};

	const content = loading ? <NewsSkeleton /> : <NewsCard news={news} />;

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Nachrichten' : 'News'} />
				<title>{switchBtn ? 'Nachrichten' : 'News'}</title>
			</Helmet>
			<section className="news">
				<div className="container">
					<BreadCrumbs />
					<div className="news__wrapper">
						<h1 className="news__title title">{switchBtn ? 'Nachrichten' : 'News'}</h1>
						{/* <Link
							className="single-news__edit-btn btn btn--red btn--universal"
							to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
						>
							Create news
						</Link> */}
						{createBtn}
					</div>
					{content}
					<Pagination pageChange={onCurrentPage} pageCount={pageCount} dataSelected={dataSelected} />
				</div>
			</section>
		</>
	);
};

export default News;
