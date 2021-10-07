import { useState } from 'react';
import Navbar from './components/Navbar';
import CardsContainer from './components/CardsContainer';
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
					<CardsContainer />
				</>
			) : (
				<></>
			)}
			<Footer />
		</div>
	);
}

export default App;
