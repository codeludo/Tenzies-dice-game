import React from "react"
import "./App.css"

function App() {
	return (
		<main>
			<div className="container">
				<div className="board">
					<h1>Tenzies</h1>
					<p>
						Roll until all dice are the same. Click each die to
						freeze it at its current value between rolls.
					</p>
					<div className="game">
						<div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
                        <div className="dice">?</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App

