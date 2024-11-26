"use client"
import { useRouter } from "next/navigation";

interface PlanDetails {
  title: string;
  price: string;
  features: string[];
  buyFunction: () => void;
  bestValue?: boolean;
}

const Plan = ({ params: { plan } }: { params: { plan: string } }) => {
  const router = useRouter();

  const buyLeaner = () => {
    window.open("https://buy.stripe.com/8wMdUa4yVfBy9Wg9AD", "_blank");
  };

  const buyStudent = () => {
    window.open("https://buy.stripe.com/3csbM28Pb896c4obIK", "_blank");
  };

  const buyStudyholic = () => {
    window.open("https://buy.stripe.com/3cs6rI0iFahe1pK9AB", "_blank");
  };

  const planDetails: Record<string, PlanDetails> = {
    learner: {
      title: "Learner",
      price: "$2.99",
      features: [
        "Up to 5 flashcard sets per month",
        "Up to 15 flashcards per set"
      ],
      buyFunction: buyLeaner
    },
    student: {
      title: "Student",
      price: "$4.99",
      features: [
        "Up to 10 flashcard sets per month",
        "Up to 25 flashcards per set"
      ],
      buyFunction: buyStudent,
      bestValue: true
    },
    studyholic: {
      title: "Studyholic",
      price: "$9.99",
      features: [
        "Up to 20 flashcard sets per month",
        "Up to 30 flashcards per set"
      ],
      buyFunction: buyStudyholic
    }
  };

  const currentPlan = planDetails[plan];

  if (!currentPlan) {
    return (
      <div className="bg-[#6A7FDB] min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-20 rounded-lg p-8">
          <h1 className="text-white text-2xl font-bold">Invalid Plan</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#6A7FDB] min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md relative">
        {currentPlan.bestValue && (
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-[#6A7FDB] text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg">
            Best Value!
          </div>
        )}
        <h1 className="text-white text-3xl font-bold mb-2 text-center">{currentPlan.title} Plan</h1>
        <p className="text-white text-3xl font-bold mb-6 text-center">{currentPlan.price}<span className="text-lg">/month</span></p>
        <ul className="text-white mb-6">
          {currentPlan.features.map((feature, index) => (
            <li key={index} className="mb-2">• {feature}</li>
          ))}
        </ul>
        {/*<button
          type="button"
          onClick={currentPlan.buyFunction}
          className="w-full bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Confirm Purchase
        </button>
  */}
        <button
          type="button"
          className="w-full bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default Plan;