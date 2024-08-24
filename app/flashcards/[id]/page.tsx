"use server"
import { createClient } from "@/utils/supabase/server"
import Sets from "@/components/set"
import Link from "next/link"

const FlashcardsPage = async ({ params: {id} } : {params: {id: string}}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('flashcards').select('*').eq('id', id).single()
  
  if (error) {
    console.error('Error fetching flashcards:', error)
    return <div>Error loading flashcards</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="relative mb-8 mt-4">
        <h1 className="text-white text-3xl font-bold text-center">{data.name}</h1>
        <Link 
          href={`/flashcards/${id}/edit`}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
      </div>
      {<Sets data={data.cards} />}
    </div>
  )
}

export default FlashcardsPage