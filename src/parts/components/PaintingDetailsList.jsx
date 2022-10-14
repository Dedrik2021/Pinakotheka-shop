import AuthorCard from './AuthorCard';
import Block from './Block';
import logo from '../../assets/images/content/logo.svg';
import { memo } from 'react';

const PaintingDetailsList = memo(({ item, filterBtn, painting }) => {
	return (
		<ul className="creations-details__list">
			<li className={`creations-details__item  ${filterBtn === 0 ? 'active' : ''}`}>
				<AuthorCard {...painting} />

				<div>
					{painting.info.map((item, i) => {
						return <p key={i}>{item}</p>;
					})}
				</div>
			</li>
			<li
				className={`creations-details__item  ${
					filterBtn === 1 ? 'active' : ''
				}`}
			>
				<Block blockInfo={item} />
				<div>
					{painting.info.map((item, i) => {
						return <p key={i}>{item}</p>;
					})}
				</div>
			</li>
			<li
				className={`creations-details__item  ${
					filterBtn === 2 ? 'active' : ''
				}`}
			>
				<img src={logo} alt="logo" width="180" height="50" />
				<div>
					{painting.info.map((item, i) => {
						return <p key={i}>{item}</p>;
					})}
				</div>
			</li>
			<li
				className={`creations-details__item  ${
					filterBtn === 3 ? 'active' : ''
				}`}
			>
				<img src={logo} alt="logo" width="180" height="50" />
				<div>
					{painting.info.map((item, i) => {
						return <p key={i}>{item}</p>;
					})}
				</div>
			</li>
		</ul>
	);
});

export default PaintingDetailsList;
