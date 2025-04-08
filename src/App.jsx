import { Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Menu />} />
			<Route path="/menu/:category" element={<Menu />} />
		</Routes>
	);
};

export default App;
