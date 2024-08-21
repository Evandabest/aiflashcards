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
    const [data, setData] = useState<any>()
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            const { data: {user}, error } = await supabase.auth.getUser()
            if (error) {
                console.error('Error fetching user:', error)
                return
            }
            const id = user?.id;
            if (!id) {
                console.error('Error fetching user id');
                return;
            }
            const { data, error: error2 } = await supabase.from('profiles').select('*').eq('id', id)
            if (error2) {
                console.error('Error fetching posts:', error2);
                return;
            }
            setData(data)
            console.log(data[0])
        }
        getData()
    }, [supabase])

    const goToPlans = async () => {
        router.push("/plans")
    }


    const generate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        //call api
        event.preventDefault()
        const datas = notes
        const res = await fetch('/api/flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({notes: datas, datas: data[0], title})
        })

        if (res.ok) {
            const jsonResponse = await res.json();
            const generatedId = jsonResponse.id;
            console.log("Generated ID:", generatedId);
    
            // Go to flashcards
            router.push(`/flashcards/${generatedId}`);
        } else {
            console.error("Failed to generate flashcards:", res.statusText);
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (name === "title") {
            setTitle(value)
        } else if (name === "notes") {
            setNotes(value)
        }
    }
    
    return (
        <>
            <form>
                <p>Paste your notes</p>
                <input type="text" value={title} onChange={handleChange} name="title" placeholder="Title" />
                <input type="textarea" value={notes} onChange={handleChange} name="notes" placeholder="Notes" />
                {data && data[0].plan == "free" && data[0].free_cards == 1 ? ( 
                <button onClick={generate} type="submit">Generate Cards</button>
                ) : (
                    <>
                    <AlertDialog>
                        <AlertDialogTrigger>Generate Cards</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Ran out of free cards?</AlertDialogTitle>
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
                    </>
                )}

            </form>
        
        </>
    )


}

export default Add  