import { Link } from 'react-router-dom';
import logo from '../../assets/images/content/logo.svg'
import background from '../../assets/images/content/error-404.png'
import backgroundBlur from '../../assets/images/content/error-404.png'

const Error404 = () => {
    
	return (
		<section className="error-404">
			<div className="container">
				<img className="error-404__logo" src={logo} alt="logo" />
				<div className="error-404__bg" style={{backgroundImage: `url(${background})`}}>
					<div
						className="error-404__blur blur"
						style={{backgroundImage: `url(${backgroundBlur})`}}
					></div>
					<span className="error-404__bg-color"></span>
					<div className="error-404__box">
						<span className="error-404__subtitle">Ölgemälde</span>
						<h1 className="error-404__title title">"404 Error"</h1>
						<div className="error-404__text">
							<p>Wir sind bereits dabei zu vermissen!</p>
							<p>Aber es gibt noch viele andere Gemälde in unserem Katalog.</p>
						</div>
						<Link className="error-404__btn btn btn--red btn--universal" to={'/'}>
							Zum Katalog gehen
						</Link>
						<a className="error-404__link more-link" href="/">
							Zurück zur Hauptseite
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Error404;
