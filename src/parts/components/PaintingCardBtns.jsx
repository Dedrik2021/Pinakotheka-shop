const PaintingCardBtns = ({filterBtn, setFilterBtn}) => {
	const tabsBtns = [
		{ id: 0, title: 'Beschreibung' },
		{ id: 1, title: 'Charakteristisch' },
		{ id: 2, title: 'Lieferung' },
		{ id: 3, title: 'Garantien' },
	];
	return (
		<ul className="tabs-btns">
			{tabsBtns.map(({ id, title }) => {
				return (
					<li className="tabs-btns__item" key={id}>
						<button
							className={`tabs-btns__btn tabs-btns__btn--descr btn ${filterBtn === id ? 'active' : ''}`}
							type="button"
							onClick={() => setFilterBtn(id)}
						>
							{title}
							<span></span>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default PaintingCardBtns;
