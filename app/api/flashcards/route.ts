import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST (req : Request) {
    const apiKey = process.env.NEXT_GOOGLE_GEMINI_KEY!;
    const supabase = createClient()
    const { notes, datas, title } : { notes: any, datas: any, title: any} = await req.json()
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    let prompt = ""

    //if (datas.plan == "free" && datas.setLimit > 0) {
    //    prompt +=  `Make no more than 10 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>} in a JSON array. If there isnt any index, return an empty array`
    //}
    //else if (datas.plan == "tier-1" && datas.setLimit > 0) {
    //    prompt +=  `Make no more than 15 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>} in a JSON array. If there isnt any index, return an empty array`
    //}
    //else if (datas.plan == "tier-2" && datas.setLimit > 0) {
    //    prompt +=  `Make no more than 20 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>} in a JSON array. If there isnt any index, return an empty array`
    //}
    //else if (datas.plan == "tier-3" && datas.setLimit > 0) {
    //    prompt +=  `Make no more than 30 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>} in a JSON array. If there isnt any index, return an empty array`
    //}
//

    prompt +=  `Make no more than 10 flashcards based on the following notes, ${notes} return each of the flashcards in the following format: { front: <term>, back: <definition>} in a JSON array. If there isnt any index, return an empty array`
    
    try {
        const result = await model.generateContent( prompt );
        let text = await result.response.text();

        // Remove the backticks, `\n`, and other unnecessary characters
        text = text.replace(/```json|```/g, '').replace(/\\n/g, '').trim();

        if (text === "[]") {
            return NextResponse.json({ Error: "No flashcards generated" });
        }
        const flashcards = JSON.parse(text); 
        //console.log(flashcards);


        const { data, error } = await supabase.from("flashcards").insert({ owner: datas.id, cards: flashcards, name: title }).select("id");

        const id = data && data[0] ? data[0].id : null;
        
        let newCards;
        if (datas.flashcards && Array.isArray(datas.flashcards) && datas.flashcards.length > 0) {
            newCards = [...datas.flashcards, id];
        } else {
            newCards = [id];
        }
        const newData = {
            flashcards: newCards,
            setLimit: datas.setLimit - 1,
            free_cards: datas.plan == "free" ? 0 : datas.free_cards
        }
        const { data: data2, error: error2 } = await supabase.from("profiles").update(newData).eq('id', datas.id).select("id");
        if (error2) {
            return NextResponse.json({ Error: "Failed to update user profile" });
        }

        if (error) {
            return NextResponse.json({ Error: "Failed to insert flashcards" });
        }

        return NextResponse.json({ Success: "Flashcards generated successfully", id: id });
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ Error: "An unexpected error occurred" });
    }
}