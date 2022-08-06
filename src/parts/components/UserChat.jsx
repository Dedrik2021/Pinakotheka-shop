import { Helmet } from "react-helmet";

const UserChat = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Chat" />
				<title>Chat</title>
			</Helmet>
			<div className="container">
				<h1>User Chat</h1>
			</div>
		</>
	);
};

export default UserChat;
