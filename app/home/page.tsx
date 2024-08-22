
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
        <div className="bg-[#6A7FDB] min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Sets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          className="bg-white bg-opacity-20 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors"
          onClick={goToAdd}
        >
          <span className="text-white text-xl font-medium">Add</span>
        </div>
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="bg-white bg-opacity-20 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors"
            onClick={() => goToSet(flashcard.id)}
          >
            <h2 className="text-white text-lg font-medium mb-2">{flashcard.name}</h2>
            <button className="text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-[#6A7FDB] transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
      {flashcards.length === 0 && (
        <p className="text-white text-center mt-8">No flashcards available.</p>
      )}
    </div>

    );
}

export default Home