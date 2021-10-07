import React, { useState, useEffect } from 'react';
import styles from '../styles/MainContainer.module.scss';
import API_KEY from '../Keys';
import Chevron from './Chevron';
import Card from './Card';

export default function MainContainer({ cardDetail }) {
	const url = 'https://api.rawg.io/api/games?page_size=8&key=' + API_KEY;
	const [fetchUrl, setFetchUrl] = useState(url);
	const [posts, setPosts] = useState(undefined);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getPosts = async () => {
			setLoading(true);
			try {
				const response = await fetch(fetchUrl);
				const result = await response.json();
				setPosts(result);
				setLoading(false);
			} catch (err) {
				console.log(`${err}. Try again later.`);
			}
		};

		getPosts();
	}, [fetchUrl]);

	const handlePreviousClick = () => {
		setFetchUrl(posts.previous);
	};

	const handleNextClick = () => {
		setFetchUrl(posts.next);
	};

	const onCardDetail = (post) => {
		cardDetail(post);
	};

	return (
		<div className={styles.mainContainer}>
			{posts?.previous && (
				<Chevron
					className={styles.previous}
					onClick={handlePreviousClick}
					orientation="left"
				/>
			)}

			<div className={styles.cardsContainer}>
				{loading && <h1>Loading...</h1>}

				{!loading &&
					posts?.results.map((post) => (
						<Card
							key={post.id}
							name={post.name}
							image={post.background_image}
							cardDetail={() => onCardDetail(post)}
						/>
					))}
			</div>

			{posts?.next && (
				<Chevron
					className={styles.next}
					onClick={handleNextClick}
					orientation="right"
				/>
			)}
		</div>
	);
}
