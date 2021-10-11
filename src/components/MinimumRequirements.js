import React from 'react';
import styles from '../styles/MinimumRequirements.module.scss';

export default function MinimumRequirements({ platforms }) {
	let spanLines = [];
	let minimumRequirements = undefined;
	let platform = platforms.find((item) => item.platform.name === 'PC');

	if (platform?.requirements.minimum) {
		minimumRequirements = platform.requirements.minimum
			.replaceAll(':', ': ')
			.split('\n');

		for (let i = 0; i < minimumRequirements.length; i++) {
			spanLines.push(
				<span className={styles.lines} key={`line${i}`}>
					- {minimumRequirements[i]}.
				</span>
			);
		}
	}

	return (
		<>
			{minimumRequirements && (
				<p>
					<b>PC Requirements: </b>
					{spanLines}
				</p>
			)}
		</>
	);
}
