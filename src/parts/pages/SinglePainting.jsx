import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';

import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import BreadCrumbs from '../components/BreadCrumbs';
import PaintingCartInfo from '../components/PaintingCartInfo';
import PaintingCardBtns from '../components/PaintingCardBtns';
import PaintingDetailsList from '../components/PaintingDetailsList';
import SinglePaintingSkeleton from '../../skeletons/singlePaintingSkeleton';
import {
	fetchAuthorInfo,
	fetchSinglePainting,
} from '../../redux/slices/authorsInfosSlice';

const SinglePainting = () => {
	const {id} = useParams()
	const dispatch = useDispatch();
	const [filterBtn, setFilterBtn] = useState(0);
	const { authorInfo, singlePainting } = useSelector((state) => state.authorsInfos);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchSinglePainting());
		dispatch(fetchAuthorInfo({ authorId: id }));
	}, []);

	if (!authorInfo) {
		return (
			<div className="container">
				<SinglePaintingSkeleton />
			</div>
		);
	}

	const elements = authorInfo.works.map((item) => {
		if (item.id === singlePainting.painting) {
			return (
				<div key={item.id}>
					<section className="creations-details__info">
						<h2 className="sr-only">Einzelheiten</h2>
						<PaintingCartInfo {...item} />
					</section>
					<section className="creations-details__tabs">
						<h2 className="sr-only">Besonderheiten</h2>
						<PaintingCardBtns filterBtn={filterBtn} setFilterBtn={setFilterBtn} />
						<PaintingDetailsList item={item} filterBtn={filterBtn} painting={authorInfo} />
					</section>
				</div>
			);
		}
	});

	return (
		<>
			<Helmet>
				<meta name="description" content="Details das Bildes" />
				<title>Details das Bildes</title>
			</Helmet>
			<div className="creations-details">
				<div className="container">
					<BreadCrumbs />

					{elements}

					<section className="others-creation">
						<h2 className="others-creation__title title">andere Werke das Autors</h2>
						<ul className="others-creation__list cards-list">
							<li className="others-creation__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-1.jpg",
                            "alt": "Timeo danaos et donna fere...",
                            "title": "Timeo danaos et donna fere...",
                            "name": "Carla Sá Fernandes",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 010"
                        }) */}
							</li>
						</ul>
					</section>
				</div>
				<section className="similar-paintings">
					<div className="container">
						<h2 className="similar-paintings__title title">Gemälde mit ähnlichen Themen</h2>
						<ul className="similar-paintings__list cards-list">
							<li className="similar-paintings__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-12.jpg",
                            "alt": "Tableau 2 novembre 16",
                            "title": "Tableau 2 novembre 16",
                            "name": "Marcello Carrozzini",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 510"
                        }) */}
							</li>
						</ul>
					</div>
				</section>
				<section className="recent-watched">
					<div className="container">
						<h2 className="recent-watched__title title">vor kurzem hast du zugeschaut</h2>
						<ul className="recent-watched__list cards-list">
							<li className="recent-watched__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-1.jpg",
                            "alt": "Timeo danaos et donna fere...",
                            "title": "Timeo danaos et donna fere...",
                            "name": "Carla Sá Fernandes",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 010"
                        }) */}
							</li>
						</ul>
					</div>
				</section>
			</div>
		</>
	);
};

export default SinglePainting;
