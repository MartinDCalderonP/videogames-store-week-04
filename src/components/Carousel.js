import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import API_KEY from '../Keys';
import Spinner from './Spinner';
import Chevron from './Chevron';
import data from '../jsons/carousel.json';

export default function Carousel({ toDetail }) {
	const fetchUrl = `https://api.rawg.io/api/games?&dates=2021-01-01,2021-10-01&page_size=3&ordering=-metacritic&key=${API_KEY}`;
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState(data);
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

		// getPosts();
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

	const uppercaseTitle = (title) => {
		let words = title.toLowerCase().split(' ');

		for (let i = 0; i < words.length; i++) {
			if (words[i] === '3d' || words[i] === 'vii') {
				words[i] = words[i].toUpperCase();
			} else {
				words[i] = words[i][0].toUpperCase() + words[i].substr(1);
			}
		}

		return words.join(' ');
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
		<>
			{loading && <Spinner />}

			{!loading && posts && (
				<div className={styles.carousel}>
					<Chevron
						className={styles.previous}
						onClick={handlePreviousClick}
						orientation="left"
					/>

					<div
						className={`${styles.carouselItem} ${styles.fade}`}
						onClick={() => handleCarouselItemClick(posts?.results[current].id)}
					>
						<h1>{uppercaseTitle(posts?.results[current].name)}</h1>

						<div className={styles.triangle}></div>
						<h2>Top Rated </h2>

						<img
							src={posts?.results[current].background_image}
							alt={uppercaseTitle(posts?.results[current].name)}
						/>
					</div>

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
			)}
		</>
	);
}
