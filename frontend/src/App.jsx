import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header         from './components/Header';
import Footer         from './components/Footer';
import Home           from './pages/Home';
import Menu           from './pages/Menu';
import About          from './pages/About';
import Reservas       from './pages/Reservas';
import Contact        from './pages/Contact';
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
				<Route path="/reservas" element={<Reservas />} />
				<Route path="/contact"  element={<Contact />} />
				<Route path="/login"    element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/review"   element={<ReviewForm />} />
			</Routes>
			<Footer />
		</>
	);
}
