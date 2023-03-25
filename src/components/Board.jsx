import React from "react"
import Dice from "../components/Dice.jsx"
import "../styles/Board.css"
import Confetti from "react-confetti"

export default function Board(props) {
	//const [startTime, setStartTime] = React.useState(0)
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
		setGames(newGame)
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
				}
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
				}
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
		}
		if (game.tenzies) {
			let now = Date.now()
			timeElapsed =  (now - props.startTime) / 1000
			props.setTime(timeElapsed)
		} else if (props.startTime != 0) {
			let now = Date.now()
			timeElapsed =  (now - props.startTime) / 1000
			props.setTime(timeElapsed)
		}
		return timeElapsed
	}

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
					<button className="roll" onClick={rollDice}>
						{props.findCurrentGame.info.tenzies
							? "New game"
							: "Roll"}
					</button>
				</div>
			</div>
			{props.findCurrentGame.info.tenzies && <Confetti />}
		</main>
	)
}

