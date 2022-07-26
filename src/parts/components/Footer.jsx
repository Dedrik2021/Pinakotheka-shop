import { Link } from 'react-router-dom';
import logo from '../../assets/images/content/logo-2.svg';
import Social from './Social';

const Footer = () => {
	const linksBtns = [
		{ id: 0, title: 'Kreationen', src: '' },
		{ id: 1, title: 'Nachrichten', src: '' },
		{ id: 2, title: 'Über das Projekt', src: '' },
		{ id: 3, title: 'Error-404', src: '' },
		{ id: 4, title: 'FAQ', src: '' },
		{ id: 5, title: 'Nutzungsbedingungen', src: '' },
		{ id: 6, title: 'Für Autoren', src: '' },
		{ id: 7, title: 'Garantien', src: '' },
		{ id: 8, title: 'Kontakte', src: '' },
	];

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__content">
					<div className="footer__box">
						<Link className="logo footer__logo" to={'/'}>
							<img src={logo} alt="logo" width="170" height="45" />
						</Link>
						<span className="footer__copy">2020 Alle Rechte vorbehalten</span>
						<Link className="footer__box-link" to="#">
							Datenschutz-Bestimmungen
						</Link>
					</div>
					<ul className="footer__list">
						{linksBtns.map(({ id, title, src }) => (
							<li key={id} className="footer__item">
								<Link className="footer__link" to={src}>
									{title}
								</Link>
							</li>
						))}
					</ul>
					<div className="footer__wrapper">
						<a className="footer__tel" href="tel:+498924214970">
							+4 98 924 214 975
						</a>
						<Social/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
