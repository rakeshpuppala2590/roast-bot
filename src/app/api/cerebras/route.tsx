import { NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const SYSTEM_MESSAGE = `You are RoastBot, an AI that specializes in creating clever and humorous roasts. 
Keep roasts playful and witty, never cruel or offensive. Focus on situational humor and wordplay.
Avoid personal attacks, discriminatory language, or harmful content.`;

export async function POST(request: Request) {
  try {
    const { input } = await request.json(); // Expect 'input' from frontend

    // Ensure input is valid
    if (!input?.trim()) {
      return NextResponse.json(
        { error: "Input text is required" },
        { status: 400 }
      );
    }

    type ChatChoice = {
      message: {
        content: string;
        role: string;
      };
    };

    const completionResponse = (await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: `Create a playful roast about: ${input}`,
        },
      ],
      model: "llama3.1-8b",
    })) as { choices: ChatChoice[] };

    // Check if the response contains the expected content
    if (!completionResponse?.choices?.[0]?.message?.content) {
      throw new Error("No response generated");
    }

    // Return the generated response
    return NextResponse.json({
      response: completionResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
