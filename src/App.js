import { useState } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MainContainer from './components/MainContainer';
import Detail from './components/Detail';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState('home');
	const [post, setPost] = useState('');

	const onCardDetail = (post) => {
		setPage('detail');
		setPost(post);
	};

	return (
		<div className="App">
			<Navbar />

			{page === 'home' && (
				<>
					<Carousel />
					<MainContainer cardDetail={onCardDetail} />
				</>
			)}

			{page === 'detail' && <Detail post={post} />}

			<Footer />
		</div>
	);
}

export default App;
