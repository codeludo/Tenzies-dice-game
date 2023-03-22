import React from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Dice from "./Dice.jsx"
import Confetti from "react-confetti"

// TODO CSS put real dots on dice
// [x] track the number of rolls
// TODO Track the time it took to win
// TODO save your best time to localStorage

function App() {
	const [values, setValues] = React.useState(allNewGame())

	function allNewGame() {
		const values = {
			game: {
				gameId: nanoid(),
				tenzies: false,
				rolls: 0,
				time: [0],
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
	 *
	 * @returns new dice game values
	 */
	function rollDice() {
		return values.game.tenzies
			? setValues(allNewGame())
			: setValues((prevState) => {
					const newState = prevState.dices.map((dice) => {
						return dice.isHeld
							? dice
							: { ...dice, value: Math.ceil(Math.random() * 6) }
					})
					return { ...prevState, dices: newState }
			  })
	}
	/**
	 * 
	 * @param {diceId} diceId 
	 */
	function holdDice(diceId) {
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
			return { game: { ...game, tenzies: tenzies }, dices: newDicesState }
		})
	}

	/**
	 * watch tenzies game
	 */
	React.useEffect(() => {
		console.log(values.game.tenzies ? "won" : "not yet")
		console.log(values)
		console.log(values.game.tenzies)
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

