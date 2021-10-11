import React, { useState, useEffect } from 'react';
import styles from '../styles/Detail.module.scss';
import API_KEY from '../Keys';
import Chevron from '../components/Chevron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import RatingStars from '../components/RatingStars';
import PlatformIcons from '../components/PlatformIcons';
import ESRB from '../components/ESRB';
import data from '../jsons/post.json';

export default function Detail({ postId }) {
	const fetchUrl = `https://api.rawg.io/api/games/${postId}?key=${API_KEY}`;
	const [post, setPost] = useState(data);
	const [loading, setLoading] = useState(false);
	const [expandedText, setExpandedText] = useState(false);

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);

			try {
				const response = await fetch(fetchUrl);
				const result = await response.json();
				setPost(result);
				setLoading(false);
			} catch (err) {
				console.log(`${err}. Try again later.`);
			}
		};

		// getPost();
	}, [fetchUrl]);

	const handleExpandText = () => {
		setExpandedText(!expandedText);
	};

	const getNamesFromArray = (array) => {
		let names = [];

		array?.map((item) => names.push(item.name));

		return names.join(', ');
	};

	const showMinimumRequirements = (platforms) => {
		let lines = [];
		let platform = platforms.find((item) => item.platform.name === 'PC');

		if (platform?.requirements.minimum) {
			let minimumRequirements = platform.requirements.minimum
				.replaceAll(':', ': ')
				.split('\n');

			lines.push(
				<p>
					<b>PC Requirements: </b>
					{addLinesToMinimumRequirements(minimumRequirements)}
				</p>
			);

			return lines;
		}
	};

	const addLinesToMinimumRequirements = (minimumRequirements) => {
		let spanLines = [];

		for (let i = 0; i < minimumRequirements.length; i++) {
			spanLines.push(
				<span className={styles.lines} key={`line${i}`}>
					- {minimumRequirements[i]}.
				</span>
			);
		}

		return spanLines;
	};

	return (
		<div className={styles.container}>
			{loading && <h1>Loading...</h1>}

			{!loading && post && (
				<>
					<h1>{post.name}</h1>

					<div className={styles.row}>
						<div className={styles.leftColumn}>
							<div className={styles.image}>
								<img src={post.background_image} alt={post.name} />
								<h1>{post.reactions[0]}</h1>
							</div>

							<div
								className={`${styles.description} ${
									!expandedText ? '' : styles.active
								}`}
							>
								<p>{post.description_raw}</p>

								<Chevron
									className={styles.expandText}
									onClick={handleExpandText}
									orientation={!expandedText ? 'down' : 'top'}
								/>
							</div>
						</div>

						<div className={styles.dividerColumn}></div>

						<div className={styles.rightColumn}>
							<RatingStars rating={post.rating} top={post.rating_top} />

							<div className={styles.information}>
								<h3>Game Details</h3>

								<p>
									<b>Title: </b>
									{post.name_original}
								</p>

								<p>
									<b>Genre: </b>
									{getNamesFromArray(post.genres)}
								</p>

								<p>
									<b>Developer: </b>
									{getNamesFromArray(post.developers)}
								</p>

								<p>
									<b>Publisher: </b>
									{getNamesFromArray(post.publishers)}
								</p>

								{showMinimumRequirements(post.platforms)}

								<PlatformIcons platforms={post.parent_platforms} />

								<ESRB rating={post.esrb_rating} />

								<a href={post.website}>
									Official website
									<FontAwesomeIcon icon={faExternalLinkAlt} />
								</a>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
