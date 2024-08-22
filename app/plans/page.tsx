"use server"
import { redirect } from "next/navigation"

const Plans = () => {
  const goToLearner = () => {
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
    <div className="bg-[#6A7FDB] min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Check out our affordable plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <PlanCard title="Free Tier" features={["1 free flashcard set", "1 free quiz"]} />
        <PlanCard 
          title="Learner" 
          features={[
            "Up to 5 flashcard sets per month",
            "Up to 15 flashcards per set",
            "Up to 5 quizzes per month",
            "Up to 15 questions per quiz"
          ]}
          action={goToLearner}
          buttonText="Become a learner"
        />
        <PlanCard 
          title="Student" 
          features={[
            "Up to 10 flashcard sets per month",
            "Up to 25 flashcards per set",
            "Up to 10 quizzes per month",
            "Up to 20 questions per quiz"
          ]}
          action={goToStudent}
          buttonText="Become a student"
        />
        <PlanCard 
          title="Studyholic" 
          features={[
            "Up to 20 flashcard sets per month",
            "Up to 30 flashcards per set",
            "Up to 20 quizzes per month",
            "Up to 25 questions per quiz"
          ]}
          action={goToStudyholic}
          buttonText="Become a studyholic"
        />
      </div>
    </div>
  )
}

interface PlanCardProps {
  title: string;
  features: string[];
  action?: () => void;
  buttonText?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, features, action, buttonText }) => (
  <div className="bg-white bg-opacity-20 rounded-lg p-6 flex flex-col justify-between">
    <div>
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <ul className="text-white mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2">• {feature}</li>
        ))}
      </ul>
    </div>
    {action && buttonText && (
      <form>
        <button 
          formAction={action}
          className="w-full bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          {buttonText}
        </button>
      </form>
    )}
  </div>
)

export default Plans