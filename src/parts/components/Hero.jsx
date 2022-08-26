import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeSinglePainting, fetchAuthorsItems } from '../../redux/slices/authorsInfosSlice';

const NextArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--next'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const PrevArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--prev'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const Hero = () => {
	const [sliderImg, setSliderImg] = useState();
	const [sliderInfo, setSliderInfo] = useState();
	const dispatch = useDispatch();
	const paintingsInfo = useSelector((state) => state.authorsInfos.paintings);
	const modal = useSelector((state) => state.authorsInfos.modal);
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	useEffect(() => {
		dispatch(fetchAuthorsItems());
	}, []);

	const onPainting = (id) => {
		const findPainting = {
			painting: id,
		};
		dispatch(changeSinglePainting({ findPainting }));
	};

	const imgSlider = {
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		arrows: false,
		centerMode: true,
		centerPadding: '105px',
		responsive: [
			{
				breakpoint: 1890,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					centerMode: false,
				},
			},
			{
				breakpoint: 1670,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
				},
			},
		],
	};

	const infoSlider = {
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		fade: true,
		draggable: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
	};

	return (
		<section className={`hero ${modal ? 'active' : ''}`}>
			<h2 className="sr-only">
				{switchBtn ? 'Unsere Autoren' : 'Our authors'}
			</h2>
			<div className="container">
				<span className="hero__circle"></span>
				<div className="hero__scroll">
					<span></span>{switchBtn ? 'Herunterrollen' : 'Roll down'}
				</div>
			</div>
			<div className="hero__sliders">
				<div className="container container--lg">
					<Slider
						className="hero__pick-slider"
						slide="ul"
						{...imgSlider}
						asNavFor={sliderInfo}
						ref={(sliderImg) => setSliderImg(sliderImg)}
					>
						{paintingsInfo.map(({ id, works }) => {
							return (
								<li className="hero__item" key={id}>
									<img src={works[0].img} alt={works[0].title} width="1035" height="540" />
									<div
										className="hero__img-blur blur"
										style={{ backgroundImage: `url(${works[0].img})` }}
									></div>
								</li>
							);
						})}
					</Slider>
				</div>
				<Slider
					className="hero__content-slider"
					{...infoSlider}
					asNavFor={sliderImg}
					slide="ul"
					ref={(sliderInfo) => setSliderInfo(sliderInfo)}
				>
					{paintingsInfo.map(({ id, works }) => {
						return (
							<li className="hero__item" key={id}>
								<article className="pick-card">
									<h3 className="pick-card__title">{works[0].title}</h3>
									<span className="pick-card__id">
										ID
										<span>{works[0].lot}</span>
									</span>
									<div className="pick-card__wrapper">
										<span>{switchBtn ? 'Autor' : 'Author'}:</span>
										<a className="pick-card__author" href="#" rel="author">
											{works[0].cardInfo[0].info}
										</a>
									</div>
									<span className="pick-card__material">
										<span>Material:</span>
										{works[0].material}
									</span>
									<div className="pick-card__box">
										<Link
											className="pick-card__btn btn btn--red btn--universal"
											to={`/Autor/Einzelmalerei/${id}`}
											onClick={() => onPainting(works[0].id)}
										>
											{switchBtn ? 'Mehr Details' : 'More details'}
										</Link>
										<span className="pick-card__price">
											<span>€</span>
											{works[0].price}
										</span>
									</div>
									<div className="pick-card__dots">
										<span className="pick-card__num">0{paintingsInfo[0].id}</span>
										<span className="pick-card__num">{paintingsInfo.length}</span>
									</div>
								</article>
							</li>
						);
					})}
				</Slider>
			</div>
		</section>
	);
};

export default Hero;
