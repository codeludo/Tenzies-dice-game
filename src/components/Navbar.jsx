import React from "react";
import dicesImg from  "../assets/dice-tenzies.svg"
import '../styles/Navbar.css'

export default function Navbar() {

    return (
        <nav className="dark">
            <img className="nav-image" src={dicesImg} alt="dices"/>
            <h1 className="nav-title">Tenzies</h1>
            <h4 className="aboutMe">About me</h4>
            <div className="toggler">
				<p className="toggler--light">Light</p>
				<div className="toggler--slider">
					<div className="toggler--slider--circle"></div>
				</div>
				<p className="toggler--dark">Dark</p>
			</div>
        </nav>
    )
}