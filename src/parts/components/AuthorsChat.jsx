import React, { memo } from 'react';
import {Helmet} from 'react-helmet'

let chat = {
	maxWidth: '1675px',
	width: '100%',
	marginBottom: '100px',
	paddingTop: '60px'
};

let ulChat = {
	// maxWidth: '200px',
	// width: '100%',
	marginBottom: '20px',
};

let chatGuest = {
	maxWidth: '600px',
	width: '100%',
};

let divP = {
	maxWidth: '200px',
	width: '100%',
};

let chatUser = {
	marginLeft: 'auto',
	maxWidth: '600px',
};

let article = {
	display: 'flex',
	width: '100%',
};

let form = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};

let textArr = {
	// maxWidth: '1080px',
	width: '100%',
	marginBottom: '30px',
	height: '200px',
	borderRadius: '5px',
	padding: '15px',
	resize: 'none',
};

let btn = {
	padding: '12px 50px',
	borderRadius: '5px',
};

let img = {
	objectFit: 'cover',
	borderRadius: '50%',
	marginRight: '30px',
};

const AuthorsChat = memo(({}) => {
	console.log();
	return (
		<>
			<Helmet>
				<meta name="description" content="Chat" />
				<title>Chat</title>
			</Helmet>
			<div className="chat" style={chat}>
				{/* <div className="chat__block" style={chatBlock}> */}
				<ul className="chat__list" style={chatGuest}>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="" style={divP}>
								<span>{'grgrgrgrgrgrgrgg'}</span>
								<div>
									<p>{'jjjjjjjjjujujujujujuhyhyhyhyhyhyhy'}</p>
								</div>
							</div>
						</article>
					</li>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="">
								<span>{'grgrgrgrgrgr'}</span>
								<div style={divP}>
									<p>{'grrrrrrrrrrrrrrrrrrrrrrrrgrgrgrgrg'}</p>
								</div>
							</div>
						</article>
					</li>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="">
								<span>{'grgrgrgrrgr'}</span>
								<div style={divP}>
									<p>{'grgrgrgggggggggggggrgrrrrrrrrrrrrrr'}</p>
								</div>
							</div>
						</article>
					</li>
				</ul>
				<ul className="chat__list" style={chatUser}>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="">
								<span>{'grgrgrgrgrgrgrg'}</span>
								<div style={divP}>
									<p>{'gggggggggggggggrgrgrrrrrrrrrrrrgrgrrrrg'}</p>
								</div>
							</div>
						</article>
					</li>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="">
								<span>{'grrrrrrrrrrrrrrr'}</span>
								<div style={divP}>
									<p>{'grrgrgggggggggggggggggrgrrrrrrrrrrrrrrrrr'}</p>
								</div>
							</div>
						</article>
					</li>
					<li className="chat__item" style={ulChat}>
						<article className="" style={article}>
							<img
								style={img}
								src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
								alt={''}
								height="150"
								width="150"
							/>
							<div className="">
								<span>{'grrrrrrrrrrrrrrrrrrrrrrgrgr'}</span>
								<div style={divP}>
									<p>{'grrrrrrrrrrrrrrrrrggggggggggg'}</p>
								</div>
							</div>
						</article>
					</li>
				</ul>
				{/* </div> */}
				<form action="" style={form}>
					<textarea style={textArr} name="" id="" cols="30" rows="10" />
					<button style={btn} className="universal--btn btn btn--red" type="submit">
						Senden
					</button>
				</form>
			</div>
		</>
	);
});
export default AuthorsChat;
