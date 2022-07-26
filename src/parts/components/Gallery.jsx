import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PaintingCard from '../components/PaintingCard';
import GalleryFilters from '../components/GalleryFilters';
import GallerySkeleton from '../../skeletons/gallerySkeleton';
import Pagination from './Pagination';

const Gallery = () => {
	const [paintings, setPaintings] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [dataSelected, setDataSelected] = useState(1);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState(0);

	const modal = useSelector(state => state.authorsInfos.modal)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	const filtersBtn = [
		{ id: 0, title: switchBtn ? 'Aller' : 'All' },
		{ id: 1, title: switchBtn ? 'Neue Dinge' : 'New things' },
		{ id: 2, title: switchBtn ? 'Empfohlen' : 'Recommend' },
		{ id: 3, title: switchBtn ? 'Beliebt' : 'Popular' },
		{ id: 4, title: switchBtn ? 'Rabatte' : 'Discount' },
	];

	useEffect(() => {
		fetchPaintings();
		window.scrollTo(0, 0);
	}, []);

	const fetchPaintings = async (currentPage) => {
		setLoading(true);
		const response = await fetch(`http://localhost:3001/items?_page=${currentPage}&_limit=1`);
		const data = await response.json();
		setPaintings(data);
		const total = response.headers.get('x-total-count');
		setPageCount(Math.ceil(total / 1));
		setLoading(false);
		return data;
	};

	const onCurrentPage = async (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);
		const fetchItems = await fetchPaintings(currentPage);
		setPaintings(fetchItems);
	};


	const onFilterBtn = (id) => {
		setFilter(id);
	};

	const elements = paintings.map((item) => {
		return <PaintingCard {...item} key={item.id} />;
	})

	const content = loading ? [...new Array(18)].map((_, i) => <GallerySkeleton key={i} />) : elements;
	// const errorMessage = statusPaintings === 'error' ? <h1>ERROR</h1> : null;

	return (
		<section className={`gallery ${modal ? 'active' : ''}`}>
			<h2 className="sr-only">
				{switchBtn ? 'Autoren Produkte' : 'Author Products'}
			</h2>
			<div className="container">
				<div className="gallery__content">
					<ul className="gallery-filters">
						{filtersBtn.map((item) => {
							return (
								<GalleryFilters 
								key={item.id} 
								{...item} 
								onFilterBtn={onFilterBtn} 
								filter={filter} 
								/>
							)
						})}
					</ul>
					<ul className="gallery__list cards-list">
						{content}
						{/* {errorMessage} */}
					</ul>
					<Pagination pageChange={onCurrentPage} pageCount={pageCount} dataSelected={dataSelected}/>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
