"use client"
import { useState } from "react"
import Card from "./card"

const Sets = ({data}: {data: any}) => {
    const [flip, setFlip] = useState(false)
    const [index, setIndex] = useState(0)

    const next = () => {
        if (index === data.length - 1) {
            return
        }
        setIndex(index + 1)
        setFlip(false)
    }

    const prev = () => {
        if (index === 0) {
            
            return
        }
        setIndex(index - 1)
        setFlip(false)
    }

    return (
        <>
            <div>
                <Card front={data[index].front} back={data[index].back} flip={flip} setFlip = {setFlip} />
                <div className="flex flex-row justify-center space-x-8 mt-2">
                <button className="bg-white w-[2rem] h-[1rem] bg-opacity-20 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors" onClick={prev}>Back</button>
                <button className="bg-white w-[2rem] h-[1rem] bg-opacity-20 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors" onClick={next}>Next</button>
                </div>
            </div>
        </>
    )

}

export default Sets