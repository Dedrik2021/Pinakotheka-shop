const GalleryFilters = (props) => {
    const {id, title, onFilterBtn, filter} = props
	return (
		<li className="gallery-filters__item">
			<button 
                className={
                    `gallery-filters__btn btn btn--universal 
                    ${filter === id ? 'active' : ''}`
                }
                data-filter="all" type="button"
                onClick={() => onFilterBtn(id)}
            >
				{title}
			</button>
		</li>
	);
};

export default GalleryFilters;
