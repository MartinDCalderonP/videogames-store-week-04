import { useState, useEffect } from 'react';
import API_KEY from '../Keys';

const useFetch = (fetchUrl, db) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	if (!db) {
		fetchUrl = fetchUrl + API_KEY;
	}

	const fetchData = async () => {
		fetch(fetchUrl)
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				setLoading(false);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			fetch(fetchUrl)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				});
		};

		fetchData();
	}, [fetchUrl]);

	return { data, loading, fetchData };
};

export default useFetch;
