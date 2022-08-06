import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';

const UserLikesPage = () => {
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	return (
		<>
			<Helmet>
				<meta name="description" content="Die Ihnen gefallen" />
				<title>Die Ihnen gefallen</title>
			</Helmet>
			<div className="container">
				<BreadCrumbs/>
				<h1>User Likes</h1>
			</div>
		</>
	);
};

export default UserLikesPage;
