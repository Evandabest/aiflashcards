"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const EditFlashcardsPage = ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createClient()
  const router = useRouter()
  const [name, setName] = useState("")
  const [cards, setCards] = useState<{ front: string; back: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlashcards = async () => {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching flashcards:', error)
        setLoading(false)
        return
      }

      setName(data.name)
      setCards(data.cards)
      setLoading(false)
    }

    fetchFlashcards()
  }, [id, supabase])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleCardChange = (index: number, side: 'front' | 'back', value: string) => {
    const newCards = [...cards]
    newCards[index][side] = value
    setCards(newCards)
  }

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }])
  }

  const removeCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index)
    setCards(newCards)
  }

  const saveChanges = async () => {
    const { error } = await supabase
      .from('flashcards')
      .update({ name, cards })
      .eq('id', id)

    if (error) {
      console.error('Error updating flashcards:', error)
      return
    }

    router.push(`/flashcards/${id}`)
  }

  if (loading) {
    return <div className="text-white text-center">Loading...</div>
  }

  return (
    <div className="bg-[#6A7FDB] min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">Edit Flashcard Set</h1>
        <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8">
          <label htmlFor="name" className="block text-white text-lg font-medium mb-2">
            Set Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        {cards.map((card, index) => (
          <div key={index} className="bg-white bg-opacity-20 rounded-lg p-6 mb-4">
            <div className="mb-4">
              <label htmlFor={`front-${index}`} className="block text-white text-lg font-medium mb-2">
                Front:
              </label>
              <input
                type="text"
                id={`front-${index}`}
                value={card.front}
                onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor={`back-${index}`} className="block text-white text-lg font-medium mb-2">
                Back:
              </label>
              <input
                type="text"
                id={`back-${index}`}
                value={card.back}
                onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>
            <button
              onClick={() => removeCard(index)}
              className="bg-red-500 hover:text-red-700 text-white p-2 rounded-md transition-colors"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            onClick={addCard}
            className="bg-white text-[#6A7FDB] font-bold py-2 px-6 rounded hover:bg-opacity-90 transition-colors"
          >
            Add Card
          </button>
          <button
            onClick={saveChanges}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-opacity-90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditFlashcardsPage