import React from "react"
import "../styles/Sidebar.css"

export default function Sidebar(props) {
	const items = props.games.map((game, index) => {
        return (
            <div className="game-item">
                        <p>#: {index+1}</p>
                        <p>Time: {game.info.timeStamp}s</p>
                    </div>
        )
    })
	return (
		<aside>
			<div className="aside-content">
				<h2 className="sidebar-title">Games</h2>
				<div className="game-items">
					{items}
				</div>
			</div>
		</aside>
	)
}

