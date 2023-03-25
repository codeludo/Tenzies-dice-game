import React from "react"
import Dice from "../components/Dice.jsx"
import "../styles/Board.css"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

export default function Board(props) {
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
		props.setGames((prevState) => [...prevState, newGame])
		props.setCurrentGameId(newGame.info.id)
		props.setTime(0)
		props.setStartTime(0)
		props.setIsActive(true)
		console.log("new game created")
	}

	/**
	 * track rolls and dice values :v
	 * @returns values
	 */
	function rollDice() {
		const currentGame = props.findCurrentGame
		const newDicesState = currentGame.dices.map((dice) => {
			return dice.isHeld
				? dice
				: { ...dice, value: Math.ceil(Math.random() * 6) }
		})

		props.setGames((prevState) => {
			const newGameState = prevState.map((game) => {
				if (game.info.id === currentGame.info.id) {
					return {
						info: {
							...currentGame.info,
							rolls: currentGame.info.rolls + 1,
						},
						dices: newDicesState,
					}
				} else return game
			})
			return newGameState
		})
	}

	/**
	 *  track tenzies, dices values(isHeld), timestamp each hold.
	 * @param {diceId} diceId
	 */
	function holdDice(diceId) {
		const currentGame = props.findCurrentGame
		props.setGames((prevState) => {
			const newGameState = prevState.map((game) => {

				if (game.info.id === currentGame.info.id) {
					const newDicesState = game.dices.map((dice, index) => {
						return dice.id === diceId
							? { ...dice, isHeld: !dice.isHeld }
							: dice
					})
					const tenzies = newDicesState.every(
						(dice) =>
							dice.isHeld === true &&
							newDicesState.every(
								(dice1) => dice1.value === dice.value
							)
					)

					const gameData = {
						...game.info,
						holds: game.info.holds + 1,
						tenzies: tenzies,
					}

					const time = trackTime(gameData)

					return {
						info: { ...gameData, timeStamp: time },
						dices: newDicesState,
					}
				} else return game
			})
			return newGameState
		})
	}

	/**
	 * track Time
	 * @param {game data} gameData
	 * @returns time stamp of seconds
	 */
	function trackTime(game) {
		let timeElapsed = 0
		if (game.holds === 1) {
			const start = Date.now()
			props.setStartTime(start)
			console.log("game started")
		}
		if (game.tenzies) {
			let now = Date.now()
			timeElapsed = (now - props.startTime) / 1000
			props.setTime(timeElapsed)
		} else if (props.startTime != 0) {
			let now = Date.now()
			timeElapsed = (now - props.startTime) / 1000
			props.setTime(timeElapsed)
		}
		return timeElapsed
	}

	return (
		<main>
			{!props.isActive ? (
				<div className="container">
					<div className="board">
						<h1>No games</h1>
						<button className="roll" onClick={createNewGame}>
							Play
						</button>
					</div>
				</div>
			) : (
				<div className="container">
					<div className="board">
						<h1>Tenzies</h1>
						<p>
							Roll until all dice are the same. Click each die to
							freeze it at its current value between rolls.
						</p>
						<div className="game">
							{props.findCurrentGame.dices.map((dice) => {
								return (
									<Dice
										value={dice}
										clickHandle={holdDice}
										key={dice.id}
										id={dice.id}
									/>
								)
							})}
						</div>
						{props.findCurrentGame.info.tenzies ? (
							<button className="roll" onClick={createNewGame}>
								New game
							</button>
						) : (
							<button className="roll" onClick={rollDice}>
								Roll
							</button>
						)}
					</div>
					{props.findCurrentGame.info.tenzies && <Confetti />}
				</div>
			)}
		</main>
	)
}

