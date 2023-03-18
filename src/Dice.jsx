import React from "react";
import "./Dice.css"


export default function Dice(props) {
    const className = ['dice', props.value.isHeld ? 'isHeld':""]
    return (
        <div className={className.join(" ").trim()} onClick={(e) => props.clickHandle(props.id)}>{props.value.value}</div>
    )
}