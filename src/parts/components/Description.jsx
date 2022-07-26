import logo from '../../assets/images/content/logo-2.svg'
import bg from '../../assets/images/content/descr-bg.jpg'

const Description = () => {

    const descrText = [
        {
            text: "Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Text löcke der Site. Dieser Text trägt keine semantische Last sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site."
        },
        {
            text: 'Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site.'
        },
        {
            text: 'Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site.'
        }
    ]

	return (
		<div className="descr" style={{backgroundImage: `url(${bg})`}}>
			<div className="container container--lg">
				<div className="descr__content">
					<img className="descr__logo" src={logo} alt="logo" width="340" height="95" />
					<div className="descr__text">
						{descrText.map((item, i) => {
                            return <p key={i}>{item.text}</p>
                        })}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Description;
