import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import { fetchAuthorsItems } from '../../redux/slices/authorsInfosSlice';
import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';

const BreadCrumbs = () => {
	const {id} = useParams()
	const dispatch = useDispatch();
	const {breadCrumbsTitle} = useSelector((state) => state.breadCrumbs);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	const getBreadCrumbs = (breadCrumbsTitle) => {
		if (breadCrumbsTitle.length > 1) {
			return breadCrumbsTitle.map((item) => {
				return (
					<li className="breadcrumbs__item" key={item}>
						<Link
							onClick={() => (dispatch(setBreadCrumbs(''), (dispatch(setAuthorInfoBtn(0)))))}
							className="breadcrumbs__link"
							to={breadCrumbsTitle[0].startsWith('N') ? `/${breadCrumbsTitle[0]}` : `/${breadCrumbsTitle[0]}/${id}`}
						>
							{item}
						</Link>
					</li>
				);
			});
		} else {
			return (
				<li className="breadcrumbs__item">
					<Link onClick={() => dispatch(fetchAuthorsItems())} className="breadcrumbs__link" to={``}>
						{breadCrumbsTitle}
					</Link>
				</li>
			)
		}
	};

	return (
		<ul className="breadcrumbs">
			<li className="breadcrumbs__item">
				<Link className="breadcrumbs__link" to={'/'}>
					{switchBtn ? 'Heimat' : 'Home'}
				</Link>
			</li>
			{getBreadCrumbs(breadCrumbsTitle)}
		</ul>
	);
};

export default BreadCrumbs;
