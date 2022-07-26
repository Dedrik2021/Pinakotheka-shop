import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { changeSinglePainting, fetchAuthorsItems } from '../../redux/slices/authorsInfosSlice';
import AuthorsList from '../components/AuthorsList';
import ShowMorePagination from '../components/ShowMorePagination';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import BreadCrumbs from '../components/BreadCrumbs';
import AuthorsSkeleton from '../../skeletons/authorsSkeleton';

const AuthorsPage = () => {
	const [authors, setAuthors] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [dataSelected, setDataSelected] = useState(1);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const authorsCount = useSelector((state) => state.authorsInfos.paintings);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 8);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	useEffect(() => {
		dispatch(fetchAuthorsItems());
	}, []);

	useEffect(() => {
		getAuthors();
	}, []);

	const getAuthors = async (currentPage) => {
		try {
			setLoading(true);
			const response = await fetch(`http://localhost:3001/items?_page=${currentPage}&_limit=6`);
			const data = await response.json();
			setAuthors(data);
			setLoading(false);
			const total = response.headers.get('x-total-count');
			setPageCount(Math.ceil(total / 6));
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const onCurrentPage = async (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);
		const fetchItems = await getAuthors(currentPage);
		setAuthors([...authors, ...fetchItems]);
	};

	const onPainting = (id) => {
		const findPainting = {
			painting: id,
		};
		dispatch(changeSinglePainting({ findPainting }));
	};

	const content = loading ? (
		<ul className="authors__list">
			{[...new Array(6)].map((_, i) => (
				<AuthorsSkeleton key={i} />
			))}
		</ul>
	) : (
		<AuthorsList authors={authors} onPainting={onPainting} />
	);

	return (
		<>
			<Helmet>
				<meta name="description" content="Autoren" />
				<title>Autoren</title>
			</Helmet>

			<section className="authors">
				<div className="container">
					<BreadCrumbs />
					<div className="authors__top">
						<h1 className="authors__title title">Autoren</h1>
						<div className="authors__box">
							<span className="authors__found">{authorsCount.length} Autoren gefunden</span>
							<div className="authors__wrapper">
								<div className="authors-search">
									<label className="authors-search__label" htmlFor="search-authors">
										<svg width="16" height="16">
											<use href="images/sprite.svg#search-icon"></use>
										</svg>
									</label>
									<input
										className="authors-search__input"
										type="text"
										name="[authors]search"
										id="search-authors"
										placeholder="Suche nach Nachnamen"
									/>
								</div>

								{/* @@include('./parts/components/_select-filter.html', {
                                "authors": true,
                                "value1": "Gemälde",
                                "value2": "Skulptur",
                                "value3": "Zeichnung",
                                "value4": "Digitale Kunst",
                                "value5": "Handmade",
                                "option1": "Gemälde",
                                "option2": "Skulptur",
                                "option3": "Zeichnung",
                                "option4": "Digitale Kunst",
                                "option5": "Handmade",
                            }) */}

								{/* @@include('./parts/components/_select-filter.html', {
                                "authors": false,
                                "value1": "Preis",
                                "value2": "Stilen",
                                "value3": "Artikeln",
                                "value4": "Größe",
                                "value5": "Farbe",
                                "option1": "Nach Preis sortieren",
                                "option2": "Nach Preis sortieren",
                                "option3": "Nach Artikeln sortieren",
                                "option4": "Nach Größe sortieren",
                                "option5": "Nach Farbe sortieren",
                            }) */}
							</div>
						</div>
					</div>

					{content}

					{/* <ReactPaginate
					onPageChange={onCurrentPage}
					pageCount={pageCount}
					nextLabel="Zeig mehr"
					previousLabel=""
                    containerClassName='paginate__list'
					nextClassName={`paginate__link more-link ${dataSelected === pageCount ? 'active' : ''}`}
                    pageLinkClassName={'paginate__btn'}
				/> */}
					<ShowMorePagination pageChange={onCurrentPage} pageCount={pageCount} dataSelected={dataSelected} />
				</div>
			</section>
		</>
	);
};

export default AuthorsPage;
