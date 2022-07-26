import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { 
	Home, 
	SinglePainting, 
	Error404, 
	MainLayout, 
	AboutAuthor,
	News,
	SingleNews,
	Authors,
	UserAccount,
	UserCart,
	UserLikes,
	ForgottenPassword
} from '../pages/indexPage';

import '../../scss/style.scss';

const App = () => {
	const switchBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchContent = () => {
		switch(switchBtn) {
			case 0:
				return <De/>
			case 1:
				return <En/>
			default:
				return <De/>
		}
	}

	return (
		<Router>
			<Suspense>{switchContent()}</Suspense>
		</Router>
	);
};

const En = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route path="/Autor/:id" element={<AboutAuthor />} />
				<Route path="/Autoren" element={<Authors />} />
				<Route path="/Autor/Einzelmalerei/:id" element={<SinglePainting />} />
				<Route path="/Nachrichten" element={<News />} />
				<Route path="/Korb" element={<UserCart />} />
				<Route path="/PersonlichesBuro" element={<UserAccount />} />
				<Route path="/DieIhnenGefallen" element={<UserLikes />} />
				<Route path="/PasswortVergessen" element={<ForgottenPassword />} />
				<Route path="/Nachrichten/Nachricht/:id" element={<SingleNews />} />
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	);
};

const De = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route path="/Autoren" element={<Authors />} />
				<Route path="/Autor/:id" element={<AboutAuthor />} />
				<Route path="/Autor/Einzelmalerei/:id" element={<SinglePainting />} />
				<Route path="/Nachrichten" element={<News />} />
				<Route path="/Korb" element={<UserCart />} />
				<Route path="/PersonlichesBuro" element={<UserAccount />} />
				<Route path="/DieIhnenGefallen" element={<UserLikes />} />
				<Route path="/PasswortVergessen" element={<ForgottenPassword />} />
				<Route path="/Nachrichten/Nachricht/:id" element={<SingleNews />} />
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	);
};

export default App;
