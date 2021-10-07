import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ toHome }) {
	const handleHomeClick = () => {
		toHome('home');
	};

	return (
		<nav className={styles.navbar}>
			<div onClick={handleHomeClick}>
				<FontAwesomeIcon icon={faHome} />
				Home
			</div>
		</nav>
	);
}
