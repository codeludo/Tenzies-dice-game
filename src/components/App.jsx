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

	function createNewGame() {
		const newGame = {
			info: {
				id: nanoid(),
				tenzies: false,
				rolls: 0,
				holds: 0,
				timeStamp: 0,
			},
			dices: [],
		}
		for (let i = 0; i < 10; i++) {
			const dice = {
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			}
			newGame.dices.push(dice)
		}
		setGames((prevState) => [...prevState, newGame])
		setCurrentGameId(newGame.info.id)
		setIsActive(true)
	}

	function findCurrentGame() {
		return games.find((game) => game.info.id === currentGameId) || games[0]
	}

	/**
	 * watch game for now!
	 */
	React.useEffect(() => {
		if (isActive) console.log(findCurrentGame().info.tenzies ? "won" : "not yet")
		console.log(findCurrentGame())
		console.log(games)
		console.log("time")
		console.log(time)
	}, [games])

	return (
		<div className="app">
			<Navbar />
			<Sidebar games={games} currentGame={findCurrentGame()} />
			{isActive ? (
				<Board
					time={time}
					setTime={setTime}
					setStartTime={setStartTime}
					startTime={startTime}
					isActive={isActive}
					setIsActive={setIsActive}
					findCurrentGame={findCurrentGame()}
					setGames={setGames}
				/>
			) : (
				<main>
					<div className="container">
						<div className="board">
							<h1>No games</h1>
							<button className="roll" onClick={createNewGame}>
								Play
							</button>
						</div>
					</div>
				</main>
			)}
			<Footer />
		</div>
	)
}

export default App

