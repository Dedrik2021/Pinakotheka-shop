// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { getAuth } from 'firebase/auth';

// import UserInfo from '../components/UserInfo';
// import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
// import BreadCrumbs from '../components/BreadCrumbs';
// import UserAccount from './UserAccountPage';

// const ReviewUserInfo = () => {
// 	const { id } = useParams();
// 	const navigate = useNavigate
// 	const dispatch = useDispatch();
// 	const auth = getAuth();
// 	const [editBtn, setEditBtn] = useState(false);
// 	const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
// 	const switchBtn = switchLanguageBtn[0] === 0;

// 	const data = useSelector((state) => state.user.dataUsers);
// 	const foundUser = data.find((item) => item.id == id);

// 	useEffect(() => {
// 		dispatch(setBreadCrumbs(''));
// 		const pathName = switchBtn
// 			? window.location.pathname.substring(1, 26)
// 			: window.location.pathname.substring(1, 22);
// 		const name = pathName.split('/');
// 		dispatch(setBreadCrumbs(name));
// 	}, []);

// 	const changeContent = () => {
// 		if (foundUser != undefined) {
// 			if (foundUser.user === 'client' && foundUser.emailId === auth.currentUser.email) {
// 				return <UserAccount changedUser={foundUser} />;
// 			} else if (foundUser.user === 'client' && foundUser.emailId != auth.currentUser.email) {
// 				return (
// 					// <>
// 					// 	<BreadCrumbs />
// 					// 	<UserInfo user={foundUser} setEditBtn={setEditBtn} />
// 					// </>
					
// 					<UserAccount changedUser={foundUser}/>
// 				);
// 			}
// 		}
// 	};

// 	return (
		
// 			<>

// 				{changeContent()}
// 			</>
// 	);
// };

// export default ReviewUserInfo;
