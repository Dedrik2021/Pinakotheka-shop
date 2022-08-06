import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';

const UserCartPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	return (
		<>
			<Helmet>
				<meta name="description" content="Korb" />
				<title>Korb</title>
			</Helmet>
			<section>
				<div className="container">
					<BreadCrumbs />
					<h1>Cart</h1>
				</div>
			</section>
		</>
	);
};

export default UserCartPage;
