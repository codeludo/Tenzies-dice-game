import React from "react"
import "../styles/App.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Board from "./Board"
import Footer from "./Footer"

// TODO CSS put real dots on dice
// TODO save your best time to localStorage

function App() {
	
	return (
		<div className="app">
			<Navbar />
			<Sidebar />
			<Board />
			<Footer />
		</div>
	)
}

export default App

