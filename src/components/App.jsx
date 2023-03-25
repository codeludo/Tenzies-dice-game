import React from "react"
import { nanoid } from "nanoid"
import "../styles/App.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Board from "./Board"
import Footer from "./Footer"

// [x] games-data state
// TODO CSS put real dots on dice
// TODO save your best time to localStorage

function App() {
	const [games, setGames] = React.useState([])
	const [currentGameId, setCurrentGameId] = React.useState(
		(games[0] && games[0].info.id) || ""
	)
	const [isActive, setIsActive] = React.useState(false)
	const [time, setTime] = React.useState(0)
	const [startTime, setStartTime] = React.useState(0)

	function findCurrentGame() {
		return games.find((game) => game.info.id === currentGameId) || games[0]
	}

	/**
	 * watch game for now!
	 */
	React.useEffect(() => {
		if (isActive)
			console.log(findCurrentGame().info.tenzies ? "won" : "not yet")
		console.log(
			games.length > 0 ? findCurrentGame() : "need start a new game"
		)
		console.log(games)
		console.log("time")
		console.log(time)
		console.log(currentGameId)
	}, [games])

	return (
		<div className="app">
			<Navbar />
			<Sidebar games={games} findCurrentGame={findCurrentGame()} />
			<Board
				time={time} 
				setTime={setTime}
				setStartTime={setStartTime}
				startTime={startTime}
				isActive={isActive}
				setIsActive={setIsActive}
				findCurrentGame={findCurrentGame()}
				setCurrentGameId={setCurrentGameId}
				setGames={setGames}
				games={games}
			/>
			<Footer />
		</div>
	)
}
export default App

