import React from 'react';
import styles from '../styles/ESRB.module.scss';

export default function ESRB({ rating }) {
	const logos = {
		1: 'https://www.esrb.org/wp-content/uploads/2019/05/Everyone_SP.svg',
		2: 'https://www.esrb.org/wp-content/uploads/2019/05/Everyone10_SP.svg',
		3: 'https://www.esrb.org/wp-content/uploads/2019/05/Teen_SP.svg',
		4: 'https://www.esrb.org/wp-content/uploads/2019/05/Mature_SP.svg',
		5: 'https://www.esrb.org/wp-content/uploads/2019/05/Adult_SP.svg',
	};

	return (
		<>
			{rating && (
				<div className={styles.esrb}>
					<img src={logos[rating.id]} alt={rating.name} />
				</div>
			)}
		</>
	);
}
