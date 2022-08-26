import { useSelector } from "react-redux";

const PaintingCardBtns = ({filterBtn, setFilterBtn}) => {
	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0

	const tabsBtns = [
		{ id: 0, title: switchBtn ? 'Beschreibung' : 'Description' },
		{ id: 1, title: switchBtn ? 'Charakteristisch' : 'Characteristic' },
		{ id: 2, title: switchBtn ? 'Lieferung' : 'Delivery' },
		{ id: 3, title: switchBtn ? 'Garantien' : 'Guarantees' },
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
