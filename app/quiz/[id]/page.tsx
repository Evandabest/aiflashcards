"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  choices: string[];
  answer: string;
}

const QuizPage = ({ params: { id } }: { params: { id: string } }) => {
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('quizzes')
        .select('questions')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching quiz:', error);
        return;
      }

      setQuiz(JSON.parse(data.questions));
    };

    fetchQuiz();
  }, [id]);

  const handleAnswer = (choice: string) => {
    const currentQuestionData = quiz[currentQuestion];
    const isCorrect = choice === currentQuestionData.answer;

    setUserAnswers([...userAnswers, choice]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quiz.length === 0) return <div>Loading...</div>;

  if (quizCompleted) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
        <p className="mb-4">Your score: {score} out of {quiz.length}</p>
        <button 
          onClick={restartQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestionData = quiz[currentQuestion];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>
      <p className="mb-2">Question {currentQuestion + 1} of {quiz.length}</p>
      <p className="mb-4">{currentQuestionData.question}</p>
      <div className="space-y-2">
        {currentQuestionData.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(choice)}
            className="block w-full text-left p-2 border rounded hover:bg-gray-100"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;