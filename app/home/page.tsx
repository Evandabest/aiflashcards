
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
            console.log(data && data[0]?.flashcards)
            setFlashcards(data && data[0]?.flashcards)
            
        }
        fetchSets()
    }, [])

    const goToAdd = () => {
        router.push('/add')
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
                                <button>View</button>
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