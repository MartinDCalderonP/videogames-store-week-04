import { useState } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MainContainer from './components/MainContainer';
import Detail from './components/Detail';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState('home');
	const [postId, setPostId] = useState('');

	const handleToHome = (home) => {
		setPage(home);
	};

	const handleToDetail = (postId) => {
		setPage('detail');
		setPostId(postId);
	};

	return (
		<div className="App">
			<Navbar toHome={handleToHome} />

			{page === 'home' && (
				<>
					<Carousel toDetail={handleToDetail} />
					<MainContainer toDetail={handleToDetail} />
				</>
			)}

			{page === 'detail' && <Detail postId={postId} />}

			<Footer />
		</div>
	);
}

export default App;
