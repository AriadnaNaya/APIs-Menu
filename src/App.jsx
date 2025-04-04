import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MenuPage />} />
			<Route path="/menu/:category" element={<MenuPage />} />
		</Routes>
	);
};

export default App;
