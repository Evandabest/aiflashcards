
"use client"
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//will display flashcard sets here


const Home = () => {
    const supabase = createClient()
    const router = useRouter()
    const [flashcards, setFlashcards] = useState<any[]>([])
    useEffect(() => {
        const fetchSets = async () => {
            const { data : {user} } = await supabase.auth.getUser()
            const id = user?.id
            const { data, error } = await supabase
                .from('profiles')
                .select('flashcards').eq('id', id)
            if (error) {
                console.log(error)
            }
            if (!data) {
                return 
            }
            let i = 0
            let flashcards: any[] = []
            for (i; i < data[0]?.flashcards.length; i++) {
                console.log(data[0]?.flashcards[i])
                const { data: flashcardData, error: flashcardError } = await supabase.from('flashcards').select('*').eq('id', data[0]?.flashcards[i])
                if (flashcardError) {
                    console.log(flashcardError)
                }
                if (!flashcardData) {
                    return
                }
                //console.log(flashcardData)
                flashcards.push(flashcardData[0])
            }
            console.log(flashcards)
            setFlashcards(flashcards)
            
        }
        fetchSets()
    }, [])

    const goToAdd = () => {
        router.push('/add')
    }

    const goToSet = (id: string) => {
        router.push(`/flashcards/${id}`)
    }


    return (
        <div>
            <h1>Sets</h1>
            <div>
                <div>
                    <button onClick={goToAdd} >Add</button>
                </div>
                <div>
                {Array.isArray(flashcards) && flashcards.length > 0 ? (
                    flashcards.map((flashcard) => {
                        return (
                            <div key={flashcard.id}>
                                <h2>{flashcard.name}</h2>
                                <button onClick={() => goToSet(flashcard.id)}>View</button>
                            </div>
                        );
                    })
                ) : (
                    <p>No flashcards available.</p>
                )}
                </div>


            </div>
        </div>
    );
}

export default Home