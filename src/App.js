import { useState } from 'react';
import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState('home');

	return (
		<div className="App">
			<Navbar />
			{page === 'home' ? (
				<>
					<Carousel />
					<MainContainer />
				</>
			) : (
				<></>
			)}
			<Footer />
		</div>
	);
}

export default App;
