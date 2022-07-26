import React, { memo } from 'react';
import Helmet from 'react-helmet';

const Reviews = memo(({ reviews }) => {

	return (
		<>
			<Helmet>
				<meta name="description" content="Kunden-Feedback" />
				<title>Kunden-Feedback</title>
			</Helmet>
			<section className="authors-works">
				<h1 className="sr-only">Kunden-Feedback</h1>
				<div className="authors-works__content">
					<ul className="reviews__list">
						{reviews.feedBack.map((item) => {
							return (
								<li className="reviews__item" key={item.id}>
									<article className="user">
										<img src={item.avatar} alt={item.name} />
										<div className="user__box">
											<span>{item.name}</span>
											<div>
												<p>{item.message}</p>
											</div>
										</div>
									</article>
								</li>
							);
						})}
					</ul>
				</div>
			</section>
		</>
	);
});

export default Reviews;
