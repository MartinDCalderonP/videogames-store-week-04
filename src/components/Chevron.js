import React from 'react';
import styles from '../styles/Chevron.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Chevron({ className, onClick, orientation }) {
	return (
		<div
			className={
				((orientation === 'left' && styles.left) ||
					(orientation === 'right' && styles.right) ||
					(orientation === 'down' && styles.down)) +
				(className ? ` ${className}` : '')
			}
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={
					(orientation === 'left' && faChevronLeft) ||
					(orientation === 'right' && faChevronRight) ||
					(orientation === 'down' && faChevronDown)
				}
			/>
		</div>
	);
}
