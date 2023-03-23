import React from "react";
import { nanoid } from "nanoid"
import Dice from "../components/Dice.jsx"
import '../styles/Board.css'
import Confetti from "react-confetti"

export default function Board() {
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
	 *  track tenzies, dices values(isHeld), timestamp each hold.
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
			const gameData = {...game, holds: game.holds+1, tenzies: tenzies}
			const time = trackTime(gameData)
			return {game: {...gameData, timeStamp: time}, dices: newDicesState}
		})
	}

    /**
	 * track Time
	 * @param {game data} gameData 
	 * @returns time stamp of seconds
	 */
	function trackTime(gameData) {
		let time = gameData.gameTime
		if (gameData.holds === 1){
			setStartTime(Date.now)
			setNow(Date.now)
			intervalId.current = setInterval(() => setNow(Date.now), 10)
			return 0
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