import React from 'react';
import styles from '../styles/RatingStars.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';

export default function RatingStars({ rating, top }) {
	let ratingStars = [];

	for (let i = 0; i < 5; i++) {
		if (i < top) {
			ratingStars.push(<FontAwesomeIcon key={`star${i}`} icon={solidStar} />);
		} else {
			ratingStars.push(<FontAwesomeIcon key={`star${i}`} icon={outlineStar} />);
		}
	}

	return (
		<>
			{rating > 0 && (
				<div className={styles.rating}>
					<h2>{rating}</h2>
					<div>{ratingStars}</div>
				</div>
			)}
		</>
	);
}
