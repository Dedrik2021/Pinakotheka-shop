import { memo } from 'react';
import { Link } from 'react-router-dom';

const NewsCard = memo(({ news }) => {
	return (
		<ul className="news__list">
			{news.map(({ id, title, textInfo, img, data }) => {
				return (
					<li className="news__item" key={id}>
						<article className="news-card">
							<Link 
                                className="news-card__link" 
                                to={`/Nachrichten/Nachricht/${id}`}
                                >
								<div className="news-card__img-wrapper">
									<img src={img} alt={title} />
								</div>
								<div className="news-card__box">
									<time className="news-card__date" dateTime="2020-10-30T08:10:11+07:00">
										{data}
									</time>
									<h3 className="news-card__title">{title}</h3>
									<div className="news-card__text">
										<p>{textInfo[0]}</p>
									</div>
								</div>
							</Link>
						</article>
					</li>
				);
			})}
		</ul>
	);
});

export default NewsCard;
