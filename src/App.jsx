import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './Login.jsx'
import Chores from './Chores.jsx'

function App() {

  return (
	<Routes>
	<Route path="/" element={<Login />} />
	<Route path="/chores" element={<Chores />} />
	</Routes>
	);
		<>
		<a href="/LM-Cleanerapp/">Go to Login</a>
	</>
}

export default App
