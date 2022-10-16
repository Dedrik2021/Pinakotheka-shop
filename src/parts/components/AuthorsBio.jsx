import { memo, useState } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import unknownImage from '../../assets/images/content/unknow-photo.png';
import EditAuthorInfo from './EditAuthorInfo';

const AuthorsBio = memo((props) => {
	const { authorInfo, setAuthorInfoBtn, setModal, authorsMessages } = props;
	const { authorsStatus } = useSelector((state) => state.authorsInfos);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const auth = getAuth();
	const [editBtn, setEditBtn] = useState(false);
	const foundAuthor = authorInfo.emailId === auth.currentUser.email;
	// const { userInfoBtn } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const elTel = authorInfo ? authorInfo.tel.substring(1) : '';
	const phone = elTel.replace(/\s+/g, '');

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Biographie das Autors' : 'Biography of the author'}
				/>
				<title>{switchBtn ? 'Biographie das Autors' : 'Biography of the author'}</title>
			</Helmet>
			<section className="authors-works">
				<h1 className="sr-only">
					{switchBtn ? 'Biographie das Autors' : 'Biography of the author'}
				</h1>
				<div className="authors-works__content">
					{editBtn ? (
						<EditAuthorInfo/>
					) : (
						<>
							<div className="authors-works__inner">
								<div className="authors-works__img-wrapper">
									<div className="authors-works__img-box">
										<img
											className="authors-works__img"
											src={
												authorInfo.image !== ''
													? authorInfo.img
													: authorInfo && unknownImage
											}
											alt={authorInfo && authorInfo.title}
										/>
										<img
											className="authors-works__img authors-works__img--blur"
											src={
												authorInfo && authorInfo.image !== ''
													? authorInfo.img
													: authorInfo && unknownImage
											}
											alt={authorInfo && authorInfo.title}
										/>
									</div>
									{foundAuthor ? (
										<button
											type="button"
											className="authors-works__btn btn btn--universal btn--red"
											onClick={() => setEditBtn(true)}
										>
											{switchBtn
												? 'Informationen bearbeiten'
												: 'Edit Information'}
										</button>
									) : (
										<button
											type="button"
											className="authors-works__btn btn btn--universal btn--red"
											onClick={() => dispatch(setModal(true))}
										>
											{switchBtn ? 'Feedback hinterlassen' : 'Leave feedback'}
										</button>
									)}
								</div>
								<div className="authors-works__box">
									<div className="authors-work__box-wrapper">
										<span className="authors-works__name">
											{authorInfo ? authorInfo.name : '-- -- -- --'}
										</span>
										<span className="authors-works__span">
											<button
												type="button"
												className="authors-works__btn btn btn--red btn--universal"
												onClick={() => dispatch(setAuthorInfoBtn(2))}
											>
												<span>{switchBtn ? 'Bewertungen' : 'Review'}:</span>
												<span>
													{authorInfo
														? authorInfo.feedBack.length
														: '-- -- -- --'}
												</span>
											</button>
										</span>
										<span className="authors-works__span">
											<button
												type="button"
												className=" authors-works__btn btn btn--red btn--universal"
												onClick={() => dispatch(setAuthorInfoBtn(1))}
											>
												<span>
													{switchBtn ? 'Gesamtarbeiten' : 'Overall works'}
													:
												</span>
												<span>
													{authorInfo
														? authorInfo.works.length
														: '-- -- --'}
												</span>
											</button>
										</span>
									</div>
									<div className="authors-work__box-wrapper">
										<span>
											<a
												className="authors-works__link"
												href={`tel: ${phone}`}
											>
												<span>Tel:</span>
												{authorInfo ? authorInfo.tel : '-- -- -- --'}
											</a>
										</span>
										<span>
											<a
												className="authors-works__link"
												href={`mailto:${authorInfo.mail}`}
											>
												<span>Email:</span>
												{authorInfo ? authorInfo.mail : '-- -- -- --'}
											</a>
										</span>
										<span>
											<a
												className="authors-works__link"
												href={authorInfo.facebook}
											>
												<span>Facebook:</span>
												{authorInfo.facebook !== ''
													? authorInfo.facebook
													: '-- -- -- --'}
											</a>
										</span>
										<span>
											<a
												className="authors-works__link"
												href={authorInfo.insta}
											>
												<span>Instagram:</span>
												{authorInfo.insta !== ''
													? authorInfo.insta
													: '-- -- -- -- '}
											</a>
										</span>
									</div>
								</div>
							</div>
							<div className="authors-works__wrapper">
								<blockquote>
									<p>{`${authorInfo && authorInfo.quote && authorInfo.quote}`}</p>
									<cite>{authorInfo && authorInfo.quote && authorInfo.name}</cite>
								</blockquote>
								{authorInfo && authorInfo.info.length > 0 && (
									<h2 className="title">
										{switchBtn ? 'Biographie' : 'Biography'}
									</h2>
								)}
								{authorInfo &&
									authorInfo.info.map((item, i) => {
										return <p key={i}>{item}</p>;
									})}
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
});

export default AuthorsBio;
