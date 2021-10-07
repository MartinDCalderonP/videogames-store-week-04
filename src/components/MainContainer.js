import React from 'react';
import styles from '../styles/MainContainer.module.scss';
import Card from './Card';
import Chevron from './Chevron';

export default function MainContainer() {
	return (
		<div className={styles.mainContainer}>
			<Chevron
				className={styles.previous}
				// onClick={handlePreviousClick}
				orientation="left"
			/>

			<div className={styles.cardsContainer}>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>

			<Chevron
				className={styles.next}
				// onClick={handleNextClick}
				orientation="right"
			/>
		</div>
	);
}
