import React from 'react';
import styles from '../styles/Detail.module.scss';

export default function Detail({
	postId
}) {
	return (
		<div className={styles.container}>
			<h1>{postId}</h1>
		</div>
	);
}
