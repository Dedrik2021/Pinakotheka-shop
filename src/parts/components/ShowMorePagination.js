import { memo } from 'react';
import ReactPaginate from 'react-paginate';

const ShowMorePagination = memo(({ pageChange, pageCount, dataSelected }) => {
	return (
		<ReactPaginate
			onPageChange={pageChange}
			pageCount={pageCount}
			nextLabel="Zeig mehr"
			previousLabel=""
			containerClassName="paginate__list"
			nextClassName={`paginate__link more-link ${dataSelected === pageCount ? 'active' : ''}`}
			pageLinkClassName={'paginate__btn'}
		/>
	);
});

export default ShowMorePagination;
