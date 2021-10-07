import { useState } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MainContainer from './components/MainContainer';
import Detail from './components/Detail';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState('home');
	const [post, setPost] = useState('');

	const handleToHome = (home) => {
		setPage(home);
	};

	const onCardDetail = (post) => {
		setPage('detail');
		setPost(post);
	};

	return (
		<div className="App">
			<Navbar toHome={handleToHome} />

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
