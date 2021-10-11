import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import API_KEY from '../Keys';
import Chevron from './Chevron';

export default function Carousel({ toDetail }) {
	const fetchUrl = `https://api.rawg.io/api/games?&dates=2021-01-01,2021-10-01&page_size=3&ordering=-metacritic&key=${API_KEY}`;
	const [posts, setPosts] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [current, setCurrent] = useState(0);

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

	useEffect(() => {
		posts?.results.length > 0 &&
			setInterval(() => {
				setCurrent((current) =>
					current === posts?.results.length - 1 ? 0 : current + 1
				);
			}, 5000);
	}, [posts?.results.length]);

	const handleCarouselItemClick = (postId) => {
		toDetail(postId);
	};

	const handlePreviousClick = () => {
		setCurrent((current) =>
			current === 0 ? posts?.results.length - 1 : current - 1
		);
	};

	const handleNextClick = () => {
		setCurrent((current) =>
			current === posts?.results.length - 1 ? 0 : current + 1
		);
	};

	const handleDotClick = (i) => {
		setCurrent(i);
	};

	return (
		<div className={styles.carousel}>
			{loading && <h1>Loading...</h1>}

			{posts && (
				<div
					className={`${styles.carouselItem} ${styles.fade}`}
					onClick={() => handleCarouselItemClick(posts?.results[current].id)}
				>
					<h1>{posts?.results[current].name}</h1>

					<img
						src={posts?.results[current].background_image}
						alt={posts?.results[current].background_image}
					/>
				</div>
			)}

			<Chevron
				className={styles.previous}
				onClick={handlePreviousClick}
				orientation="left"
			/>

			<Chevron
				className={styles.next}
				onClick={handleNextClick}
				orientation="right"
			/>

			<div className={styles.dotsContainer}>
				{posts?.results.map((item, i) => {
					return (
						<span
							className={
								styles.dot + (current === i ? ` ${styles.active}` : '')
							}
							key={`dot${i}`}
							onClick={() => handleDotClick(i)}
						/>
					);
				})}
			</div>
		</div>
	);
}
