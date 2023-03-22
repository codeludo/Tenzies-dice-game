import React from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Dice from "./Dice.jsx"
import Confetti from "react-confetti"

// TODO CSS put real dots on dice
// TODO save your best time to localStorage

function App() {
	// state to each new game
	const [values, setValues] = React.useState(allNewGame())
	const [startTime, setStartTime] = React.useState(0)
	const [now, setNow] = React.useState(0)
	const intervalId = React.useRef(null)

	function allNewGame() {
		const values = {
			game: {
				gameId: nanoid(),
				tenzies: false,
				rolls: 0,
				holds: 0,
				gameTime: 0,
			},
			dices: [],
		}
		for (let i = 0; i < 10; i++) {
			const dice = {
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			}
			values.dices.push(dice)
		}
		return values
	}
	/**
	 * track rolls and dice values :v
	 * @returns values
	 */
	function rollDice() {
		return values.game.tenzies
			? setValues(allNewGame())
			: setValues(({ game, dices }) => {
					const newState = dices.map((dice) => {
						return dice.isHeld
							? dice
							: { ...dice, value: Math.ceil(Math.random() * 6) }
					})
					return {
						game: { ...game, rolls: game.rolls + 1 },
						dices: newState,
					}
			  })
	}
	/**
	 *  track tenzies, dices values(isHeld), time of game over.
	 * @param {diceId} diceId
	 */
	function holdDice(diceId) {
		// [x] Track the time it took to win -- I think here  we can check tenzies to set time over.
		setValues(({ game, dices }) => {
			const newDicesState = dices.map((dice, index) => {
				return dice.id === diceId
					? { ...dice, isHeld: !dice.isHeld }
					: dice
			})
			const tenzies = newDicesState.every(
				(dice) =>
					dice.isHeld === true &&
					newDicesState.every((dice1) => dice1.value === dice.value)
			)
			const gameData = {...game, holds: game.holds+1, tenzies: tenzies}
			const time = trackTime(gameData)
			return {game: {...gameData, gameTime: time}, dices: newDicesState}
		})
	}

	function trackTime(gameData) {
		let time = gameData.gameTime
		if (gameData.holds === 1){
			setStartTime(Date.now)
			setNow(Date.now)
			intervalId.current = setInterval(() => setNow(Date.now), 10)
			return time
		}
		if (gameData.tenzies) {
			time = (now - startTime) / 1000
			clearInterval(intervalId.current)
		} else {
			time = (now - startTime) / 1000
		}
		return time
	}

	/**
	 * watch game for now!
	 */
	React.useEffect(() => {
		
		console.log(values.game.tenzies ? "won" : "not yet")
		console.log(values)
	}, [values])
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
						{values.dices.map((dice) => {
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
						{values.game.tenzies ? "New game" : "Roll"}
					</button>
				</div>
			</div>
			{values.game.tenzies && <Confetti />}
		</main>
	)
}

export default App

