import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryMenu from './pages/CategoryMenu';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/menu/:category" element={<CategoryMenu />} />
		</Routes>
	);
};

export default App;