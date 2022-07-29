import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BreadCrumbs from '../components/BreadCrumbs';
import AuthorsWorks from '../components/AuthorsWorks';
import AuthorsBio from '../components/AuthorsBio';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
import { fetchAuthorInfo } from '../../redux/slices/authorsInfosSlice';
import AuthorsBioSkeleton from '../../skeletons/autorsBioSkeleton';
import GallerySkeleton from '../../skeletons/gallerySkeleton';
import Reviews from '../components/Reviews';
import ReviewsSkeleton from '../../skeletons/reviewsSkeleton';
import ReviewModal from '../components/ReviewModal';
import ChatRealTime from '../components/ChatRealTime';

const AboutAuthor = () => {
	const [openModal, setOpenModal] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const authorInfoBtn = useSelector((state) => state.filters.authorInfoBtn);
	const { authorInfo, statusAuthorInfo } = useSelector((state) => state.authorsInfos);

	const aboutBtn = [
		{ id: 0, title: 'Indentität der Person' },
		{ id: 1, title: 'Gemälde zum Verkauf' },
		{ id: 2, title: 'Bewertungen' },
		{ id: 3, title: 'Chat' },
	];

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 6);
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
			<AuthorsBio authorInfo={authorInfo} setAuthorInfoBtn={setAuthorInfoBtn} setOpenModal={setOpenModal} />
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

	const reviews =
		statusAuthorInfo === 'loading' ? (
			<div className="authors-works__content">
				{[...new Array(10)].map((_, i) => (
					<ReviewsSkeleton key={i} />
				))}
			</div>
		) : (
			<Reviews reviews={authorInfo} />
		);

	{
	}

	const showContent = () => {
		switch (authorInfoBtn) {
			case 0:
				return authorsBio;
			case 1:
				return authorsWorks;
			case 2:
				return reviews;
			case 3:
				return <ChatRealTime />;
			default:
				return authorsBio;
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className="about-author">
				<div className="about-author__inner">
					{openModal && <ReviewModal closeModal={setOpenModal} />}
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

export default AboutAuthor;
