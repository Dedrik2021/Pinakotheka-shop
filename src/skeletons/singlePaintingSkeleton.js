import React from 'react';
import ContentLoader from 'react-content-loader';

const SinglePaintingSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1920}
		height={800}
		viewBox="0 0 1920 800"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="51" y="137" rx="0" ry="0" width="0" height="22" />
		<rect x="150" y="290" rx="0" ry="0" width="1" height="0" />
        <rect x="0" y="50" rx="5" ry="5" width="300" height="15" />
		<rect x="160" y="175" rx="20" ry="20" width="900" height="650" />
		<rect x="1170" y="205" rx="5" ry="5" width="140" height="20" />
		<rect x="1170" y="265" rx="5" ry="5" width="300" height="35" />
		<rect x="1170" y="325" rx="5" ry="5" width="300" height="25" />
		<rect x="1170" y="375" rx="5" ry="5" width="300" height="40" />
		<rect x="1170" y="440" rx="5" ry="5" width="100" height="25" />
		<rect x="1170" y="490" rx="5" ry="5" width="70" height="25" />
		<rect x="1170" y="540" rx="5" ry="5" width="130" height="25" />
		<rect x="1350" y="440" rx="5" ry="5" width="120" height="25" />
		<rect x="1390" y="490" rx="5" ry="5" width="80" height="25" />
		<rect x="1390" y="540" rx="5" ry="5" width="80" height="25" />
		<rect x="1170" y="625" rx="10" ry="10" width="160" height="70" />
		<rect x="1370" y="675" rx="5" ry="5" width="100" height="20" />
		<rect x="1170" y="725" rx="10" ry="10" width="300" height="60" />
	</ContentLoader>
);

export default SinglePaintingSkeleton;
