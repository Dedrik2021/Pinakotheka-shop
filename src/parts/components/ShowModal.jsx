import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShowModal = memo(({modal, setModal}) => {
    const switchBtn = useSelector((state) => state.filters.switchLanguageBtn);
    const dispatch = useDispatch();

	return (
		<div className={`menu__user-box ${modal ? 'active' : ''}`}>
			<button onClick={() => dispatch(setModal(!modal))} className="menu__enter-btn btn" type="button">
				{switchBtn == 0 ? 'Eingang' : 'Entrance'}
			</button>
		</div>
	);
});

export default ShowModal;
