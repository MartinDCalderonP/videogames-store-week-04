import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Carousel() {
	const [current, setCurrent] = useState(0);

	const slides = [
		'https://areajugones.sport.es/wp-content/uploads/2021/03/mortal-kombat-character-posters-social-featured-1080x609.jpg',
		'https://as.com/meristation/imagenes/2020/11/10/header_image/770344721605019507.jpg',
		'https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/02/mortal-kombat.jpg',
	];

	useEffect(() => {
		setInterval(() => {
			setCurrent((current) =>
				current === slides.length - 1 ? 0 : current + 1
			);
		}, 5000);
	}, [slides.length]);

	const handlePreviousClick = () => {
		setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
	};

	const handleNextClick = () => {
		setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
	};

	const handleDotClick = (i) => {
		setCurrent(i);
	};

	return (
		<div className={styles.carousel}>
			<div className={`${styles.carouselItem} ${styles.fade}`}>
				<img
					className={styles.fade}
					src={slides[current]}
					alt={slides[current]}
				/>
			</div>

			<div className={styles.previous} onClick={handlePreviousClick}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</div>

			<div className={styles.next} onClick={handleNextClick}>
				<FontAwesomeIcon icon={faChevronRight} />
			</div>

			<div className={styles.dotsContainer}>
				{slides?.map((item, i) => {
					return (
						<span
							className={
								styles.dot + (current === i ? ` ${styles.active}` : '')
							}
							key={i}
							onClick={() => handleDotClick(i)}
						/>
					);
				})}
			</div>
		</div>
	);
}
