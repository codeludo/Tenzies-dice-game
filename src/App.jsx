import React from "react"
import "./App.css"
import Board from "./Board"

// TODO CSS put real dots on dice
// TODO save your best time to localStorage

function App() {
	/**
	 * watch game for now!
	 */
	// React.useEffect(() => {
		
	// 	console.log(values.game.tenzies ? "won" : "not yet")
	// 	console.log(values)
	// }, [values])
	return (
		<div className="app">
			<Board/>
		</div>
	)
}

export default App

