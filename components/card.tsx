"use client"
import { useState } from "react"

const Card = ({front, back, flip, setFlip}: {front: string, back: string, flip: boolean, setFlip: Function}) => {
    
    return (
        <div className="card" onClick={() => {setFlip(!flip);}}>
            {flip ? 
            <p>{back}</p> : 
            <p>{front}</p>
            }
        </div>
    )
}

export default Card