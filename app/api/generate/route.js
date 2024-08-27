import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flash card creator. Your task is to generate flashcards based on the provided text. For each set of flashcards:

Create exactly 10 flashcards.
Each flashcard should have one sentence on the front that introduces a key concept, term, or question.
The back of the flashcard should contain one sentence that provides a concise explanation, definition, or answer.
Ensure that the flashcards cover a broad range of important points from the text, facilitating effective learning and review.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the the following JSON format
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}`

export async function POST(req){
    const openai= new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model:"gpt-4o",
        response_format:{type: 'json_object'}
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    
    return NextResponse.json(flashcards.flashcards)
}
