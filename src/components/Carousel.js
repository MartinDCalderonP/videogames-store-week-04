import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import Chevron from './Chevron';

export default function Carousel({ toDetail }) {
	const fetchUrl = `https://api.rawg.io/api/games?&dates=2021-01-01,2021-10-01&page_size=3&ordering=-metacritic&key=`;
	const { data, loading } = useFetch(fetchUrl);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		let isMounted = true;

		if (data?.results.length > 0) {
			setInterval(() => {
				if (isMounted) {
					setCurrent((current) =>
						current === data?.results.length - 1 ? 0 : current + 1
					);
				}
			}, 5000);
		}

		return () => {
			isMounted = false;
		};
	}, [data?.results.length]);

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
			current === 0 ? data?.results.length - 1 : current - 1
		);
	};

	const handleNextClick = () => {
		setCurrent((current) =>
			current === data?.results.length - 1 ? 0 : current + 1
		);
	};

	const handleDotClick = (i) => {
		setCurrent(i);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<div className={styles.carousel}>
					<Chevron
						className={styles.previous}
						onClick={handlePreviousClick}
						orientation="left"
					/>

					<div
						className={`${styles.carouselItem} ${styles.fade}`}
						onClick={() => handleCarouselItemClick(data?.results[current].id)}
					>
						<h1>{uppercaseTitle(data?.results[current].name)}</h1>

						<div className={styles.triangle}></div>
						<h2>Top Rated </h2>

						<img
							src={data?.results[current].background_image}
							alt={uppercaseTitle(data?.results[current].name)}
						/>
					</div>

					<Chevron
						className={styles.next}
						onClick={handleNextClick}
						orientation="right"
					/>

					<div className={styles.dotsContainer}>
						{data?.results.map((item, i) => {
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
