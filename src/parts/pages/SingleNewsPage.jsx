import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { fetchNewsItems } from '../../redux/slices/newsSlice';
import SingleNewsSkeleton from '../../skeletons/singleNewsSkeleton';

const SingleNews = () => {
	const dispatch = useDispatch();
	const { news, newsStatus } = useSelector((state) => state.newsItems);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 22);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		dispatch(fetchNewsItems());
		window.scroll(0, 0);
	}, []);

	const content = newsStatus === 'loading' ? <div className="container"><SingleNewsSkeleton /></div> : <NewsSection news={news} />;
	const errorMessage = newsStatus === 'error' ? <h1>ERROR LOADING</h1> : null;

	return (
		<>
			<Helmet>
				<meta name="description" content="Nachricht" />
				<title>Nachricht</title>
			</Helmet>
			{content}
			{errorMessage}
		</>
	);
};

const NewsSection = memo(({ news }) => {
	const { id } = useParams();

	return (
		<section className="single-news">
			<div className="container">
				<BreadCrumbs />
				<h1 className="single-news__title title">Nachricht</h1>
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
			</div>
		</section>
	);
});

export default SingleNews;
