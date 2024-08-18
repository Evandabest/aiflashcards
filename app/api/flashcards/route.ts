import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function POST (req : Request) {
    const apiKey = process.env.NEXT_GOOGLE_GEMINI_KEY!;
    const supabase = createClient()
    const { notes, datas } : { notes: any, datas: any} = await req.json()
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    let prompt = ""

    if (datas.role == "free" && datas.setLimit > 0) {
        prompt +=  `Make 10 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>}`
    }
    else if (datas.role == "tier-1" && datas.setLimit > 0) {
        prompt +=  `Make 15 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>}`
    }
    else if (datas.role == "tier-2" && datas.setLimit > 0) {
        prompt +=  `Make 20 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>}`
    }
    else if (datas.role == "tier-3" && datas.setLimit > 0) {
        prompt +=  `Make 30 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>}`
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const {data, error} = await supabase.from("flashcards").insert({owner: datas.id, cards: response}).single()

    if (error) {
        return NextResponse.json({Error: "something went wrong"})
    }
    
}