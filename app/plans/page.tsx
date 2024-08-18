"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const Plans = () => {
    
    const goToleaner = () => {
        "use server"
        redirect("/plans/learner")
    }
    const goToStudent = () => {
        "use server"
        redirect("/plans/student")
    }
    const goToStudyholic = () => {
        "use server"
        redirect("/plans/studyholic")
    }

    return (
        <>
            <p>Check out our affordable plans</p>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <p>Free Tier</p>
                    <ul>
                        <li>1 free flashcard set</li>
                        <li>1 free quiz</li>
                    </ul>
                </div>
                <form className="flex flex-col">
                    <p>Learner</p>
                    <ul>
                        <li>Up to 5 flashcard sets per month</li>
                        <li>Up to 15 flashcards per set</li>
                        <li>Up to 5 quizzes per month</li>
                        <li>Up to 15 questions per quiz</li>
                    </ul>
                    <button formAction={goToleaner}>Become a learner</button>
                </form>
                <form className="flex flex-col">
                    <p>Student</p>
                    <ul>
                        <li>Up to 10 flashcard sets per month</li>
                        <li>Up to 25 flashcards per set</li>
                        <li>Up to 10 quizzes per month</li>
                        <li>Up to 20 questions per quiz</li>
                    </ul>
                    <button formAction={goToStudent}>Become a student</button>
                </form>
                <form className="flex flex-col">
                    <p>Studyholic</p>
                    <ul>
                        <li>Up to 20 flashcard sets per month</li>
                        <li>Up to 30 flashcards per set</li>
                        <li>Up to 20 quizzes per month</li>
                        <li>Up to 25 questions per quiz</li>
                    </ul>
                    <button formAction={goToStudyholic}>Become a studyholic</button>
                </form>

            </div>
        </>
    )

}

export default Plans