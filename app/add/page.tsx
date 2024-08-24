"use client"

import { createClient } from "@/utils/supabase/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const Add = () => {
  const supabase = createClient()
  const [userData, setUserData] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        return
      }
      const id = user?.id
      if (!id) {
        console.error('Error fetching user id')
        return
      }
      const { data, error: error2 } = await supabase.from('profiles').select('*').eq('id', id).single()
      if (error2) {
        console.error('Error fetching profile:', error2)
        return
      }
      setUserData(data)
    }
    getData()
  }, [supabase])

  const goToPlans = async () => {
    router.push("/plans")
  }

  const generate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const res = await fetch('/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes, datas: userData, title })
    })

    if (res.ok) {
      const { id } = await res.json()
      router.push(`/flashcards/${id}`)
    } else {
      console.error("Failed to generate flashcards:", res.statusText)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (name === "title") setTitle(value)
    else if (name === "notes") setNotes(value)
  }

  const canGenerateCards = () => {
    if (!userData) return false
    switch (userData.plan) {
      case "free":
        return userData.setLimit > 0
      case "tier-1":
        return userData.setLimit > 0
      case "tier-2":
        return userData.setLimit > 0
      case "tier-3":
        return userData.setLimit > 0
      default:
        return false
    }
  }

  return (
    <div className="bg-[#6A7FDB] min-h-screen p-8 flex flex-col items-center justify-center">
      <form className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Add New Flashcards</h1>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
            placeholder="Title"
            className="w-full p-2 rounded bg-white bg-opacity-50 text-white placeholder-gray-200"
          />
        </div>
        <div className="mb-6">
          <textarea
            value={notes}
            onChange={handleChange}
            name="notes"
            placeholder="Paste your notes here"
            className="w-full p-2 rounded bg-white bg-opacity-50 text-white placeholder-gray-200 h-40"
          />
        </div>
        {canGenerateCards() ? (
          <button
            onClick={generate}
            type="submit"
            className="w-full bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
          >
            Generate Cards
          </button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger className="w-full bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
              Generate Cards
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ran out of cards?</AlertDialogTitle>
                <AlertDialogDescription>
                  Check out our affordable plans to get more cards and quizzes!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={goToPlans}>Check out our plans</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </form>
    </div>
  )
}

export default Add