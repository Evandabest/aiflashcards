"use client"
import { useState } from "react"

const Card = ({front, back, flip}: {front: string, back: string, flip: Function}) => {
    const [flipped, setFlipped] = useState(false)
    
    return (
        <div className="card" onClick={() => {flip(); setFlipped(true)}}>
            {flipped ? 
            <p>{front}</p> : 
            <p>{back}</p>
            }
        </div>
    )
}

export default Card