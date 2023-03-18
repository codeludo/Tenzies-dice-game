import React from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Dice from "./Dice.jsx"
import Confetti from "react-confetti"

function App() {
	const [values, setValues] = React.useState(allNewDice())
	const [tenzies, setTenzies] = React.useState(false)

	function allNewDice() {
		const values = []
		for (let i = 0; i < 10; i++) {
			const diceVal = {
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			}
			values.push(diceVal)
		}
		return values
	}

	React.useEffect(
		() => {
			setTenzies(
				() => values.every(dice =>
					dice.isHeld === true && (values.every((dice1) => dice1.value === dice.value))
			))
			console.log(tenzies ? "won" : "not yet")
			console.log(values)
		}, [values, tenzies]
	)

	function rollDice() {
		return tenzies ? setValues(allNewDice()) : setValues(prevState => 
			prevState.map(dice => {
				return dice.isHeld ? dice : {...dice, value: Math.ceil(Math.random()*6)}
			})
		)
	}

	function holdDice(diceId) {
		setValues((prevState) => {
			const newState = prevState.map((dice, index) => {
				return dice.id === diceId
					? { ...dice, isHeld: !dice.isHeld }
					: dice
			})
			return newState
		})
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
						{values.map(dice => {
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
						{tenzies ? "New game" : "Roll"}
					</button>
				</div>
			</div>
			{tenzies && < Confetti />}
		</main>
	)
}

export default App

