import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function POST (req : Request) {  
    const {id, datas, cards, nums } : {id: string, datas: any, cards: any, nums: number} = await req.json()
    const apiKey = process.env.NEXT_GOOGLE_GEMINI_KEY!;
    const supabase = createClient()
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    let prompt = ""

    if (datas.role == "free" && datas.setLimit > 0) {
        prompt +=  `Make 10 multiple choice questions based on the following flashcards, ${cards} return each of the flashcards in the following format: { question: <question>, choices: [<choice1>, <choice2>, <choice3>, <choice4>], answer: <answer>}`
    }
    else if (datas.role == "tier-1" && datas.setLimit > 0) {
        prompt +=  `Make 15 multiple choice questions based on the following flashcards, ${cards} return each of the flashcards in the following format: { question: <question>, choices: [<choice1>, <choice2>, <choice3>, <choice4>], answer: <answer>}`
    }
    else if (datas.role == "tier-2" && datas.setLimit > 0) {
        prompt +=  `Make 20 multiple choice questions based on the following flashcards, ${cards} return each of the flashcards in the following format: { question: <question>, choices: [<choice1>, <choice2>, <choice3>, <choice4>], answer: <answer>}`
    }
    else if (datas.role == "tier-3" && datas.setLimit > 0) {
        prompt +=  `Make 30 multiple choice questions based on the following flashcards, ${cards} return each of the flashcards in the following format: { question: <question>, choices: [<choice1>, <choice2>, <choice3>, <choice4>], answer: <answer>}`
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const {data, error} = await supabase.from("quizzes").insert({for: id, questions: response}).single()

    if (error) {
        return NextResponse.json({Error: "something went wrong"})
    }
    
    return NextResponse.json({ message: "Hello, World!" })
}