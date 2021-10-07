import React, { useState, useEffect } from 'react';
import styles from '../styles/MainContainer.module.scss';
import API_KEY from '../Keys';
import Chevron from './Chevron';
import Card from './Card';

export default function MainContainer() {
	const fetchUrl = 'https://api.rawg.io/api/games?page_size=8&key=' + API_KEY;
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

	return (
		<div className={styles.mainContainer}>
			<Chevron
				className={styles.previous}
				// onClick={handlePreviousClick}
				orientation="left"
			/>
			<div className={styles.cardsContainer}>
				{loading && <h1>Loading...</h1>}

				{posts?.results.map((post) => (
					<Card key={post.id} name={post.name} image={post.background_image} />
				))}
			</div>

			<Chevron
				className={styles.next}
				// onClick={handleNextClick}
				orientation="right"
			/>
		</div>
	);
}
