import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import Card from './Card';

export default function CardsContainer() {
	return (
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
	);
}
