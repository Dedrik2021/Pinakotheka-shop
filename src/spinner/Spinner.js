import img from '../assets/images/content/preloader.gif';

const Spinner = () => {
	return <img src={img} style={{width: '100%', height: '100%', objectFit: 'contain', position: 'relative', padding: '50px 50px'}} alt="Spinner" />;
};

export default Spinner;
