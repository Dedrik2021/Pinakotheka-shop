import { memo } from 'react';

const Block = memo(({ items, blockInfo }) => {
	const blockItems = [
		{ title: 'Autor' }, 
		{ title: 'Stil' }, 
		{ title: 'Segeltuch' }
	];

	const block = [
		{ title: 'Standort' },
		{ title: 'Verkäufer' },
		{ title: 'Beschaffenheit' },
		{ title: 'Material' },
		{ title: 'Methode der Erstellung' },
		{ title: 'Bewerteter Wert' },
		{ title: 'Jahre der Schöpfung' },
		{ title: 'Datum hinzugefügt' },
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
