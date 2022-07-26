import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { collection, getDocs, limit, orderBy, query, startAfter, startAt, doc, getDoc, endBefore, limitToLast, endAt } from 'firebase/firestore/lite';

import BreadCrumbs from '../components/BreadCrumbs';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import NewsSkeleton from '../../skeletons/newsSkeleton';
import { database } from '../../firebase/firebaseConfig';

const News = () => {
	const [news, setNews] = useState([]);
	const [pageCount, setPageCount] = useState(1);
	const [dataSelected, setDataSelected] = useState(1);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const [firstDocs, setFirstDocs] = useState();
	const [lastDocs, setLastDocs] = useState();
	const [newsLength, setNewsLength] = useState();
	const collectionRef = collection(database, 'news');
	
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
	// 	fetchNews();
	// 	window.scrollTo(0, 0);
	// }, []);

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


	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, []);

	const getData = async () => {
		const collectionQuery = query(collectionRef, orderBy('id', 'asc'), limit(11));
		updateState(collectionQuery);
	};

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
			updateState(collectionQuery)

		} else if (newsData.isPrevious) {
			//??????????????????????????????
		}
	};

	const content = loading ? <NewsSkeleton /> : <NewsCard news={news} />;

	return (
		<>
			<Helmet>
				<meta name="description" content="Nachrichten" />
				<title>Nachrichten</title>
			</Helmet>
			<section className="news">
				<div className="container">
					<BreadCrumbs />
					<span className="news__title title">Nachrichten</span>
					{content}
					<Pagination pageChange={onCurrentPage} pageCount={pageCount} dataSelected={dataSelected} />
				</div>
			</section>
		</>
	);
};

export default News;
