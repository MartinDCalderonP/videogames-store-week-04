import React, { useState, useEffect } from 'react';
import styles from '../styles/MainContainer.module.scss';
import API_KEY from '../Keys';
import Chevron from './Chevron';
import Spinner from './Spinner';
import Card from './Card';
import data from '../jsons/posts.json';

export default function MainContainer({ toDetail }) {
	const postsUrl = `https://api.rawg.io/api/games?page_size=8&key=${API_KEY}`;
	const [fetchUrl, setFetchUrl] = useState(postsUrl);
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState(data);

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

		// getPosts();
	}, [fetchUrl]);

	const handlePreviousClick = () => {
		setFetchUrl(posts.previous);
	};

	const handleNextClick = () => {
		setFetchUrl(posts.next);
	};

	const handleToDetail = (postId) => {
		toDetail(postId);
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
				{loading && <Spinner />}

				{!loading &&
					posts?.results.map((post) => (
						<Card
							key={post.id}
							name={post.name}
							image={post.background_image}
							toDetail={() => handleToDetail(post.id)}
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
