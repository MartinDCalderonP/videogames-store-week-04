import React from 'react';
import styles from '../styles/Card.module.scss';

export default function Card() {
	return (
		<div className={`${styles.card} ${styles.appearCard}`}>
			<h1>TITLE</h1>
			<img
				src="https://image.api.playstation.com/vulcan/ap/rnd/202009/0123/bF1qmEL5RM6aMfL0oLcxRe8B.png"
				alt="ALT"
			/>
		</div>
	);
}
