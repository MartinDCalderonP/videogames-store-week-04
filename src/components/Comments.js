import React, { useEffect, useState } from 'react';
import styles from '../styles/Comments.module.scss';
import Spinner from './Spinner';

export default function Comments({ postId }) {
	const fetchUrl = `https://videogames-store-db.herokuapp.com/comments?postId=${postId}`;
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [commentAreaValue, setCommentAreaValue] = useState(undefined);

	useEffect(() => {
		const getComments = async () => {
			setLoading(true);

			try {
				const response = await fetch(fetchUrl);
				const result = await response.json();
				setComments(result);
				setLoading(false);
			} catch (err) {
				console.log(`${err}. Try again later.`);
			}
		};

		getComments();
	}, []);

	const handleCommentAreaValueChange = (e) => {
		setCommentAreaValue(e.target.value);
	};

	const handleCommentButtonClick = (e) => {
		e.preventDefault();

		if (commentAreaValue) {
			let newComment = {};

			newComment['comment'] = commentAreaValue;
			newComment['postId'] = postId;

			postComments(newComment);
		}
	};

	const postComments = async (commentObject) => {
		try {
			const response = await fetch(fetchUrl, {
				method: 'POST',
				body: JSON.stringify(commentObject),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			if (result) {
				getComments();
			}
		} catch (err) {
			console.log(`${err}. Try again later.`);
		}
	};

	const getComments = async () => {
		setLoading(true);

		try {
			const response = await fetch(fetchUrl);
			const result = await response.json();
			setComments(result);
			setLoading(false);
		} catch (err) {
			console.log(`${err}. Try again later.`);
		}
	};

	return (
		<>
			<div className={styles.commentBox}>
				<textarea
					className={styles.commentArea}
					type="text"
					name="commentArea"
					placeholder="Leave a comment..."
					rows="5"
					onChange={handleCommentAreaValueChange}
				/>

				<button
					className={styles.commentButton}
					onClick={handleCommentButtonClick}
				>
					Comentar
				</button>
			</div>

			<div className={styles.commentsContainer}>
				<h3>Comments:</h3>

				{loading && <Spinner />}

				{!loading &&
					comments?.length > 0 &&
					comments?.map((item) => (
						<div key={`comment${item.id}`}>
							<p>{item.comment}</p>
						</div>
					))}

				{!loading && comments?.length === 0 && (
					<h3>There are no comments yet.</h3>
				)}
			</div>
		</>
	);
}
