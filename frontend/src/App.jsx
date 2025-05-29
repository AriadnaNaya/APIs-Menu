import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header         from './components/Header';
import Footer         from './components/Footer';
import Home           from './pages/Home';
import Menu           from './pages/Menu';
import About          from './pages/About';
import ReservaForm    from './pages/ReservaForm.jsx';
import Login          from './pages/Login';
import Register       from './pages/Register';
import ReviewForm     from './pages/ReviewForm';

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/"         element={<Home />} />
				<Route path="/menu"     element={<Menu />} />
				<Route path="/about"    element={<About />} />
				<Route path="/reservas" element={<ReservaForm />} />
				<Route path="/login"    element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/review"   element={<ReviewForm />} />
			</Routes>
			<Footer />
		</>
	);
}
