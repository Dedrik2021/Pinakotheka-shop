import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { fetchNewsItems } from '../../redux/slices/newsSlice';
import SingleNewsSkeleton from '../../skeletons/singleNewsSkeleton';
import { database } from '../../firebase/firebaseConfig';

const SingleNews = () => {
	const dispatch = useDispatch();
	const { news, newsStatus } = useSelector((state) => state.newsItems);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = switchBtn
			? window.location.pathname.substring(1, 22)
			: window.location.pathname.substring(1, 12);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		dispatch(fetchNewsItems());
		window.scroll(0, 0);
	}, []);

	const content =
		newsStatus === 'loading' ? (
			<div className="container">
				<SingleNewsSkeleton />
			</div>
		) : (
			<NewsSection news={news} />
		);
	const errorMessage = newsStatus === 'error' ? <h1>ERROR LOADING</h1> : null;

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Nachricht' : 'News'} />
				<title>{switchBtn ? 'Nachricht' : 'News'}</title>
			</Helmet>
			{content}
			{errorMessage}
		</>
	);
};

const NewsSection = memo(({ news }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const foundNews = news.find((item) => item.id == id);
	const auth = getAuth();
	const user = auth.currentUser;

	const onDelete = () => {
		if (window.confirm('Delete news! are you sure?')) {
			const docToUpdates = doc(database, 'news', foundNews.ID);
			deleteDoc(docToUpdates)
				.then(navigate(switchBtn ? '/Nachrichten' : '/News'))
				.catch((err) => {
					alert(err.message);
				});
		}
	};

	const showBtns = () => {
		return user ? (
			<>
				<button className="single-news__delete-btn btn btn--universal" type="button" onClick={onDelete}>
					Delete news
				</button>
				<Link
					className="single-news__edit-btn btn btn--red btn--universal"
					to={`${switchBtn ? '/Nachrichten/NeuigkeitenBearbeiten/' : '/News/EditNews/'}${id}`}
				>
					Edit news
				</Link>
			</>
		) : null;
	} 

	return (
		<div className="container">
			<BreadCrumbs />
			<section className="single-news">
				<div className="single-news__wrapper">
					<h1 className="single-news__title title">{switchBtn ? 'Nachricht' : 'News'}</h1>
					<div className="single-news__btns-wrapper">
						{showBtns()}
					</div>
				</div>
				{news.map((item) => {
					if (item.id == id) {
						return (
							<article className="news-card" key={id}>
								<div className="news-card__link">
									<div className="news-card__img-wrapper">
										<img src={item.img} alt={item.title} />
										<img src={item.img} alt={item.title} />
									</div>
									<div className="news-card__box">
										<time className="news-card__date" dateTime="2020-10-30T08:10:11+07:00">
											{item.data}
										</time>
										<h3 className="news-card__title">{item.title}</h3>
										<div className="news-card__text">
											{item.textInfo.map((info, i) => {
												return <p key={i}>{info}</p>;
											})}
										</div>
									</div>
								</div>
							</article>
						);
					}
				})}
			</section>
		</div>
	);
});

export default SingleNews;
