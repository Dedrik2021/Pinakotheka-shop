import { Helmet } from "react-helmet";

const UserNotificationSettings = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Benachrichtigungseinstellungen" />
				<title>Benachrichtigungseinstellungen</title>
			</Helmet>
			<div className="container">
				<h1>User Notification Settings</h1>
			</div>
		</>
	);
};

export default UserNotificationSettings;
