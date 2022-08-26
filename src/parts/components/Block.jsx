import { memo } from 'react';
import { useSelector } from 'react-redux';

const Block = memo(({ items, blockInfo }) => {
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	const blockItems = [
		{ title: switchBtn ? 'Autor' : 'Author' }, 
		{ title: switchBtn ? 'Stil' : 'Style' }, 
		{ title: switchBtn ? 'Segeltuch' : 'Sailcloth' }
	];

	const block = [
		{ title: switchBtn ? 'Standort' : 'Location' },
		{ title: switchBtn ? 'Verkäufer' : 'Seller' },
		{ title: switchBtn ? 'Beschaffenheit' : 'Texture' },
		{ title: switchBtn ? 'Material' : 'Material' },
		{ title: switchBtn ? 'Methode der Erstellung' : 'Method of creation' },
		{ title: switchBtn ? 'Bewerteter Wert' : 'Assessed value' },
		{ title: switchBtn ? 'Jahre der Schöpfung' : 'Years of creation' },
		{ title: switchBtn ? 'Datum hinzugefügt' : 'Date added' },
	];

	const getBlockItems = (items, blockInfo) => {
		if (items) {
			return (
				<>
					<ul className="block">
						{blockItems.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span className="block__author-item">{item.title}:</span>
								</li>
							);
						})}
					</ul>
					<ul className="block">
						{items.cardInfo.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span key={i} className="block__author-item block__author-item--thing">
										{item.info}
									</span>
								</li>
							);
						})}
					</ul>
				</>
			);
		} else {
			return (
				<>
					<ul className="block">
						{block.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span className="block__author-item">{item.title}:</span>
								</li>
							);
						})}
					</ul>
					<ul className="block">
						{blockInfo.aboutCard.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span key={i} className="block__author-item block__author-item--thing">
										{item.info}
									</span>
								</li>
							);
						})}
					</ul>
				</>
			);
		}
	};

	return <div className="block-section">{getBlockItems(items, blockInfo)}</div>;
});

export default Block;
