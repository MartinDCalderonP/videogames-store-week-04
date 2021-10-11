import React, { useState } from 'react';
import styles from '../styles/MainContainer.module.scss';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import Chevron from './Chevron';
import Card from './Card';

export default function MainContainer({ toDetail }) {
	const postsUrl = `https://api.rawg.io/api/games?page_size=8&key=`;
	const [fetchUrl, setFetchUrl] = useState(postsUrl);
	const { data, loading } = useFetch(fetchUrl);

	const handlePreviousClick = () => {
		setFetchUrl(data.previous);
	};

	const handleNextClick = () => {
		setFetchUrl(data.next);
	};

	const handleToDetail = (postId) => {
		toDetail(postId);
	};

	return (
		<div className={styles.mainContainer}>
			{data?.previous && (
				<Chevron
					className={styles.previous}
					onClick={handlePreviousClick}
					orientation="left"
				/>
			)}

			<div className={styles.cardsContainer}>
				{loading && <Spinner />}

				{!loading &&
					data?.results.map((post) => (
						<Card
							key={post.id}
							name={post.name}
							image={post.background_image}
							toDetail={() => handleToDetail(post.id)}
						/>
					))}
			</div>

			{data?.next && (
				<Chevron
					className={styles.next}
					onClick={handleNextClick}
					orientation="right"
				/>
			)}
		</div>
	);
}
