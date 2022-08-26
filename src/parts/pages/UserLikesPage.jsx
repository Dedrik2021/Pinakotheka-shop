import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';

const UserLikesPage = () => {
	const dispatch = useDispatch()
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Die Ihnen gefallen' : 'What you like'} />
				<title>{switchBtn ? 'Die Ihnen gefallen' : 'What you like'}</title>
			</Helmet>
			<div className="container">
				<BreadCrumbs/>
				<h1>User Likes</h1>
			</div>
		</>
	);
};

export default UserLikesPage;
