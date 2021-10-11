import React from 'react';
import Carousel from '../components/Carousel';
import MainContainer from '../components/MainContainer';

export default function Home({ toDetail }) {
	const handleToDetail = (postId) => {
		toDetail(postId);
	};

	return (
		<>
			<Carousel toDetail={handleToDetail} />
			<MainContainer toDetail={handleToDetail} />
		</>
	);
}
