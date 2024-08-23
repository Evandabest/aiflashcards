"use server"
import { createClient } from "@/utils/supabase/server"
import Sets from "@/components/set"

const FlashcardsPage = async ({ params: {id} } : {params: {id: string}}) => {
    const supabase = createClient()
    const { data, error } = await supabase.from('flashcards').select('*').eq('id', id).single()
    if (error) {
        console.error('Error fetching flashcards:', error)
        return
    }

    return (
        <>
            <div>
                <h1 className="text-white text-3xl font-bold mb-8 text-center">{data.name}</h1>
                {<Sets data = {data.cards}></Sets>
                }
                
            </div>
        </>
    )

}
export default FlashcardsPage

