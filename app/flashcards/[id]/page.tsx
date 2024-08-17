"use server"
import { createClient } from "@/utils/supabase/server"
import Sets from "@/components/set"

const FlashcardsPage = async ({ id } : {id: string}) => {
    const supabase = createClient()
    const { data, error } = await supabase.from('flashcards').select('*').eq('id', id).single()
    if (error) {
        console.error('Error fetching flashcards:', error)
        return
    }
    console.log(data)
    return (
        <>
            <div>
                <h1>{data.title}</h1>
                <Sets data = {data}></Sets>
                
            </div>
        </>
    )

}

export default FlashcardsPage

