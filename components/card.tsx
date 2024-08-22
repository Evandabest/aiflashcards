"use client"
import { useState } from "react"

const Card = ({front, back, flip, setFlip}: {front: string, back: string, flip: boolean, setFlip: Function}) => {
    
    return (
        <div className="bg-white w-[50rem] h-[30rem] m-auto bg-opacity-20 rounded-lg p-6 flex flex-col items-center justify-center text-white text-2xl cursor-pointer hover:bg-opacity-30 transition-colors" onClick={() => {setFlip(!flip);}}>
            {flip ? 
            <p>{back}</p> : 
            <p>{front}</p>
            }
        </div>
    )
}

export default Card