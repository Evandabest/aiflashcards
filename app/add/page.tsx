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

        //gotoflashcards
    }
    
    return (
        <>
            <form>
                <p>Paste your notes</p>
                <input type="text" name="title" placeholder="Title" />
                <input type="textarea" name="notes" placeholder="Notes" />
                {data && data.plan == "free" && data.free_cards == true ? ( 
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