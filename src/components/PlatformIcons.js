import React from 'react';
import styles from '../styles/PlatformIcons.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import {
	faPlaystation,
	faXbox,
	faApple,
} from '@fortawesome/free-brands-svg-icons';

export default function PlatformIcons({ platforms }) {
	let platformsNames = [];
	let iconsToShow = [];

	platforms?.map((item) => platformsNames.push(item.platform.name));

	const icons = {
		PC: <FontAwesomeIcon key="pcIcon" icon={faDesktop} />,
		PlayStation: <FontAwesomeIcon key="psIcon" icon={faPlaystation} />,
		Xbox: <FontAwesomeIcon key="xboxIcon" icon={faXbox} />,
		'Apple Macintosh': <FontAwesomeIcon key="appleIcon" icon={faApple} />,
	};

	for (let i = 0; i < platformsNames.length; i++) {
		iconsToShow.push(icons[platformsNames[i]]);
	}

	return <div className={styles.platformsIcons}>{iconsToShow}</div>;
}
