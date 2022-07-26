import {Helmet} from 'react-helmet'

import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Description from '../components/Description';
import NewsBlock from '../components/NewsBlock';
import AuthorsBlock from '../components/AuthorsBlock';

const HomePage = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Unsere Dienstleistungen" />
				<title>Unsere Dienstleistungen</title>
			</Helmet>
			<h1 className="sr-only">Unsere Dienstleistungen</h1>
			<Hero />
			<Gallery />
			<Description/>
			<NewsBlock/>
			<AuthorsBlock/>
		</>
	);
};

export default HomePage;
