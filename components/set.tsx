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
                <button onClick={prev}>Back</button>
                <Card front={data[index].front} back={data[index].back} flip={flip} setFlip = {setFlip} />
                <button onClick={next}>Next</button>
            </div>
        </>
    )

}

export default Sets