import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Chevron({ className, onClick, orientation }) {
	return (
		<div className={className} onClick={onClick}>
			<FontAwesomeIcon
				icon={
					(orientation === 'left' && faChevronLeft) ||
					(orientation === 'right' && faChevronRight)
				}
			/>
		</div>
	);
}
