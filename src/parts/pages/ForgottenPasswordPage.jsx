import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import img from '../../assets/images/content/forgotten-password_img.png';
import BreadCrumbs from '../components/BreadCrumbs';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';

const ForgottenPassword = () => {

    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 22);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	return (
		<>
			<h1 className="sr-only">Passwort vergessen</h1>
			<div className="forgotten-password__bg"></div>
            <div className='container'>
                <BreadCrumbs/>
            </div>
			<section className="forgotten-password">
				<div className="container">
					<div className="forgotten-password__inner">
						<div className="forgotten-password__box">
							<h2 className="forgotten-password__title title">Hast du dein Passwort vergessen?</h2>
							<div>
								<p>
									Dann gib deine E-Mail-Adresse ein und wir senden Ihnen Informationen zur
									Passwortwiederherstellung.
								</p>
							</div>
							<form className="forgotten-password__form">
								<label className="forgotten-password__label" htmlFor="forgotten-password__email">
									<span className="sr-only">Email</span>
								</label>
								<input
									className="forgotten-password__input"
									type="email"
									placeholder="Email"
									name="[senden]email"
									id="forgotten-password__email"
									required
								/>

								<button className="forgotten-password__btn btn--universal btn--red btn" type="submit">
									Senden
								</button>
							</form>
						</div>
						<div className="forgotten-password__img" style={{ backgroundImage: `url(${img})` }}></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ForgottenPassword;
