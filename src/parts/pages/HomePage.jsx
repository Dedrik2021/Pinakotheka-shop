import {Helmet} from 'react-helmet'
import { useSelector } from 'react-redux';

import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Description from '../components/Description';
import NewsBlock from '../components/NewsBlock';
import AuthorsBlock from '../components/AuthorsBlock';

const HomePage = () => {
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn == 0

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Unsere Dienstleistungen' : 'Our services'} />
				<title>{switchBtn ? 'Unsere Dienstleistungen' : 'Our services'}</title>
			</Helmet>
			<h1 className="sr-only">
				{switchBtn ? 'Unsere Dienstleistungen' : 'Our services'}
			</h1>
			<Hero />
			<Gallery />
			<Description/>
			<NewsBlock/>
			<AuthorsBlock/>
		</>
	);
};

export default HomePage;
