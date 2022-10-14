import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MainLayout = () => {
	const { modal} = useSelector(state => state.authorsInfos)

	return (
		<div className={`app ${modal ? 'lock' : ''}`}>
			<Header />
			<main>
				<Outlet/>
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
