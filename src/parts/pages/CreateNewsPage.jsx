import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocs, collection, addDoc } from 'firebase/firestore/lite';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { database, storage } from '../../firebase/firebaseConfig';
import { fetchNewsItems } from '../../redux/slices/newsSlice';
import img from '../../assets/images/content/news-image.jpg';
import Spinner from '../../spinner/Spinner';
import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
import BreadCrumbs from '../components/BreadCrumbs';
import CleanInputIcon from '../../assets/images/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/images/sprite/keyboard-icon.svg';

const CreateNews = () => {
	const [titleInput, setTitleInput] = useState('');
	const [textInput, setTextInput] = useState('');
	const [dataStorage, setDataStorage] = useState({});
	const [imageInput, setImageInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [newsImg, setNewsImg] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = getAuth()
	const userAuth = auth.currentUser
	const news = useSelector((state) => state.newsItems.news);
	const users = useSelector(state => state.user.dataUsers)
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const foundUser = users.find(item => item.emailId === userAuth.email)

	const changeImg = newsImg === '' ? news.img : newsImg;
	const emptyImg = newsImg === '' ? img : newsImg;

	useEffect(() => {
		dispatch(fetchNewsItems());
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		dispatch(setBreadCrumbs(''));
		const pathName = window.location.pathname.substring(1, 35);
		const name = pathName.split('/');
		dispatch(setBreadCrumbs(name));
	}, []);

	const createNews = (e) => {
		e.preventDefault();
		addDoc(collection(database, 'news'), {
			id: news.length + 1,
			img: newsImg === '' ? img : newsImg,
			title: titleInput,
			textInfo: [textInput],
			data: new Date().toLocaleDateString(),
			author: foundUser.name,
			authorEmail: foundUser.emailId
		})
			.then(navigate(switchBtn ? '/Nachrichten' : '/News'))
			.catch((error) => {
				alert(error.message);
			});
	};

	const onStorage = () => {
		const storageRef = ref(storage, `images/ news/ ${news.length + 1}/${dataStorage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, dataStorage);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setLoading(true);
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log(`Upload is ${progress}% done`);
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					// console.log('File available at', downloadURL);
					let img = [];
					if (downloadURL) {
						setTimeout(() => {
							img.push(downloadURL);
							setNewsImg(img[0]);
							setLoading(false);
						}, 0);
					}
				});
			},
		);
	};

	const onLoading = () => {
		if (loading) {
			return <Spinner />;
		} else {
			return (
				<>
					<img
						className="create-news__img"
						src={newsImg === '' ? emptyImg : changeImg}
						alt={news.title}
						width={290}
						height={400}
					/>
					<img
						className="create-news__img create-news__img--blur"
						src={newsImg === '' ? emptyImg : changeImg}
						alt={news.title}
						width={290}
						height={400}
					/>
				</>
			);
		}
	};

	return (
		<div className="container">
			<Helmet>
				<meta name="description" content={switchBtn ? 'Nachrichten erstellen' : 'Create News'} />
				<title>{switchBtn ? 'Nachrichten erstellen' : 'Create News'}</title>
			</Helmet>
			<BreadCrumbs />
			<h1 className="create-news__title title">{switchBtn ? 'Nachrichten erstellen' : 'Create News'}</h1>
			<section className="create-news">
				<form className="create-news__form" onSubmit={(e) => createNews(e)}>
					<div className="create-news__block">
						<div className="create-news__img-wrapper">{onLoading()}</div>
						<div className="create-news__block-btn">
							<label
								className="create-news__label create-news__label--img btn btn--universal"
								htmlFor="img"
							>
								Select image
								<input
									className="create-news__input create-news__input--img"
									type="file"
									name="img"
									id="img"
									onChange={(e) => (setImageInput(e.target.value), setDataStorage(e.target.files[0]))}
								/>
							</label>
							<button
								className="create-news__btn btn btn--red btn--universal"
								type="button"
								onClick={onStorage}
							>
								Add image
							</button>
						</div>
					</div>

					<div className="create-news__box">
						<div className="create-news__input-wrapper">
							<button
								className="create-news__clean-btn btn"
								type="button"
								onClick={() => setTitleInput('')}
							>
								{titleInput ? (
									<>
										<span className="sr-only">
											{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
										</span>
										<svg width="20" height="20">
											<use href={`${CleanInputIcon}#clean-input`}></use>
										</svg>
									</>
								) : (
									<svg className="keyboard" width="20" height="20">
										<use href={`${Keyboard}#keyboard`}></use>
									</svg>
								)}
							</button>
							{/* <div className="create-news__clean-btn">
								{titleInput ? (
									<button
										className="create-news__clean--btn"
										type="button"
										onClick={() => setTitleInput('')}
									>
										<span className="sr-only">
											{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
										</span>
										<svg width="20" height="20">
											<use href={`${CleanInputIcon}#clean-input`}></use>
										</svg>
									</button>
								) : (
									<svg className="keyboard" width="20" height="20">
										<use href={`${Keyboard}#keyboard`}></use>
									</svg>
								)}
							</div> */}
							<label className="create-news__label create-news__label--title" htmlFor="title">
								Title
							</label>
							<input
								className="create-news__input"
								type="text"
								name="title"
								id="title"
								value={titleInput}
								required
								onChange={(e) => setTitleInput(e.target.value)}
							/>
						</div>
						<div className="create-news__input-wrapper">
							<button
								className="create-news__clean-btn create-news__clean-btn--text btn"
								type="button"
								onClick={() => setTextInput('')}
							>
								{textInput ? (
									<>
										<span className="sr-only">
											{switchBtn ? 'Eingabefeld löschen' : 'Delete input field'}
										</span>
										<svg width="20" height="20">
											<use href={`${CleanInputIcon}#clean-input`}></use>
										</svg>
									</>
								) : (
									<svg className="keyboard" width="20" height="20">
										<use href={`${Keyboard}#keyboard`}></use>
									</svg>
								)}
							</button>
							<label className="create-news__label create-news__label--text" htmlFor="text">
								Text
							</label>
							<textarea
								className="create-news__input"
								type="text"
								id="text"
								name="text"
								value={textInput}
								placeholder="Type a description"
								required
								onChange={(e) => setTextInput(e.target.value)}
							/>
						</div>

						<div className="create-news__btns-wrapper">
							<button
								className="create-news__btn create-news__btn--cancel btn btn--universal"
								type="button"
								onClick={() => navigate(switchBtn ? '/Nachrichten' : '/News')}
							>
								Cancel
							</button>
							<button className="create-news__btn btn btn--red btn--universal" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default CreateNews;
