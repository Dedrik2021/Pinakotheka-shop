import { memo } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import AuthorsWorksSkeleton from '../../skeletons/autorsBioSkeleton';

const AuthorsBio = memo((props) => {
	const {authorInfo, setAuthorInfoBtn, setModal, authorsMessages} = props
	// const authorInfo = useSelector(state => state.authorsInfos.authorInfo)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	// if (!authorInfo) {
	// 	return (
	// 		<div className="container">
	// 			<AuthorsWorksSkeleton />
	// 		</div>
	// 	);
	// }
	const dispatch = useDispatch()
	const elTel = authorInfo.tel.substring(1);
	const phone = elTel.replace(/\s+/g, '');

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Biographie das Autors' : 'Biography of the author'}/>
				<title>
					{switchBtn ? 'Biographie das Autors' : 'Biography of the author'}
				</title>
			</Helmet>
			<section className="authors-works">
				<h1 className="sr-only">
					{switchBtn ? 'Biographie das Autors' : 'Biography of the author'}
				</h1>
				<div className="authors-works__content">
					<div className="authors-works__inner">
						<div className="authors-works__img-wrapper">
							<div className="authors-works__img-box">
								<img className="authors-works__img" src={authorInfo.img} alt={authorInfo.title} />
								<img
									className="authors-works__img authors-works__img--blur"
									src={authorInfo.img}
									alt={authorInfo.title}
								/>
							</div>
							<button 
								type="button" 
								className="authors-works__btn btn btn--universal btn--red"
								onClick={() => dispatch(setModal(true))}
								>
								{switchBtn ? 'Feedback hinterlassen' : 'Leave feedback'}
							</button>
						</div>
						<div className="authors-works__box">
							<span className="authors-works__name">{authorInfo.name}</span>
							<span className="authors-works__span">
								<button 
									type="button" 
									className="authors-works__btn btn btn--red btn--universal"
									onClick={() => dispatch(setAuthorInfoBtn(2))}
								>
									<span>
										{switchBtn ? 'Bewertungen' : 'Review'}:
									</span>
									<span>{authorsMessages.length}</span>
								</button>
							</span>
							<span className="authors-works__span">
								<button 
									type="button" 
									className=" authors-works__btn btn btn--red btn--universal"
									onClick={() => dispatch(setAuthorInfoBtn(1))}
									>
									<span>
										{switchBtn ? 'Gesamtarbeiten' : 'Overall works'}:
									</span>
									<span>{authorInfo.works.length}</span>
								</button>
							</span>
							<span>
								<a className="authors-works__link" href={`tel: ${phone}`}>
									{authorInfo.tel}
								</a>
							</span>
							<span>
								<a className="authors-works__link" target={'_blank'} href="www.facebook.com">
									{authorInfo.facebook}
								</a>
							</span>
							<span>
								<a className="authors-works__link" target={'_blank'} href="www.instagram.com">
									{authorInfo.insta}
								</a>
							</span>
							<span>
								<a className="authors-works__link" href="mailTo: TommaAbts@gmail.com">
									{authorInfo.mail}
								</a>
							</span>
						</div>
					</div>
					<div className="authors-works__wrapper">
						<blockquote>
							<p>{`"${authorInfo.quote}"`}</p>
							<cite>{authorInfo.name}</cite>
						</blockquote>
						<h2 className="title">
							{switchBtn ? 'Biographie' : 'Biography'}
						</h2>
						{authorInfo.info.map((item, i) => {
							return <p key={i}>{item.bio}</p>;
						})}
					</div>
				</div>
			</section>
		</>
	);
});

export default AuthorsBio;
