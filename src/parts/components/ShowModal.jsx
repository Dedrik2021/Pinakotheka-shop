import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

import Modal from "./Modal";
import ReviewModal from "./ReviewModal";

const ShowModal = memo((props) => {
	const {
		modal,
		setModal,
		userAuth,
		user,
		authorInfo,
		authorUsers,
		clientUsers
	} = props
	
    const switchBtn = useSelector((state) => state.filters.switchLanguageBtn);
    const dispatch = useDispatch();


	// const changeModal = () => {
	// 	// if (user !== null) {
	// 	// 	console.log('user');
	// 	// 	return <ReviewModal 
	// 	// 		closeModal={setModal}
	// 	// 		userAuth={user}
	// 	// 		authorInfo={authorInfo}
	// 	// 		/>
	// 	// } else {
	// 	// 	console.log('no user');
	// 	// 	return <Modal closeModal={setModal}/>
	// 	// }

	// 	return user !== null ?
	// 	<ReviewModal 
	// 		closeModal={setModal}
	// 		userAuth={user}
	// 		authorInfo={authorInfo}
	// 	/> :
	// 	<Modal closeModal={setModal}/>
	// } 

	console.log(userAuth);

	return (
		<div className={`menu__user-box ${modal ? 'active' : ''}`}>
			<button onClick={() => dispatch(setModal(!modal))} className="menu__enter-btn btn" type="button">
				{switchBtn == 0 ? 'Eingang' : 'Entrance'}
			</button>
			{/* {modal && <Modal closeModal={setModal} />} */}
		</div>
	);
});

export default ShowModal;
