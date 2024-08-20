import { createClient } from "@/utils/supabase/server";


const Plan = ({plan}:{plan: any}) => {
    console.log(plan)
    

    const buyLeaner = async () => {
        //api call to stripe
    }

    const buyStudent = async () => {
        //api call to stripe
    }

    const buyStudyholic = async () => {
        //api call to stripe
    }


    if (plan === "learner") {
        return (
            <>
                <div className="flex flex-col">
                    <p>Learner</p>
                    <ul>
                        <li>Up to 5 flashcard sets per month</li>
                        <li>Up to 15 flashcards per set</li>
                        <li>Up to 5 quizzes per month</li>
                        <li>Up to 15 questions per quiz</li>
                    </ul>
                    <button formAction={buyLeaner}>Confirm Purchase</button>
                </div>
            </>
        )
    } else if (plan === "student") {
        return (
            <>
                <div className="flex flex-col">
                    <p>Student</p>
                    <ul>
                        <li>Up to 10 flashcard sets per month</li>
                        <li>Up to 25 flashcards per set</li>
                        <li>Up to 10 quizzes per month</li>
                        <li>Up to 20 questions per quiz</li>
                    </ul>
                    <button formAction={buyStudent}>Confirm Purchase</button>
                </div>
            </>
        )
    } else if (plan === "studyholic") {
        return (
            <>
                <div className="flex flex-col">
                    <p>Studyholic</p>
                    <ul>
                        <li>Up to 20 flashcard sets per month</li>
                        <li>Up to 30 flashcards per set</li>
                        <li>Up to 20 quizzes per month</li>
                        <li>Up to 25 questions per quiz</li>
                    </ul>
                    <button formAction={buyStudyholic}>Become a studyholic</button>
                </div>
            </>
        )
    }

}

export default Plan;
