import React from 'react';
import styles from '../styles/Detail.module.scss';

export default function Detail({ post }) {
	return (
		<div>
			<h1>{post.name}</h1>
		</div>
	);
}
