import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    const { guestName } = await request.json();

    if (!guestName) {
      return NextResponse.json({ error: 'Guest name is required' }, { status: 400 });
    }

    // Try to find the transcript file
    const transcriptsDir = "/Users/shrikantkadu/Desktop/Lenny's Podcast Transcripts Archive [public]";

    // Try exact match first
    let transcriptPath = path.join(transcriptsDir, `${guestName}.txt`);

    // If exact match doesn't exist, try to find a file that contains the guest name
    if (!fs.existsSync(transcriptPath)) {
      const files = fs.readdirSync(transcriptsDir);
      const matchingFile = files.find(file =>
        file.toLowerCase().includes(guestName.toLowerCase().split(' ')[0]) ||
        file.toLowerCase().includes(guestName.toLowerCase().split(' ')[1] || '')
      );

      if (matchingFile) {
        transcriptPath = path.join(transcriptsDir, matchingFile);
      } else {
        return NextResponse.json({
          summary: `Transcript not found for ${guestName}. The episode summary will be available once the transcript is processed.`
        });
      }
    }

    // Read the transcript
    const transcript = fs.readFileSync(transcriptPath, 'utf-8');

    // Use Groq AI to extract intelligent insights
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Steve Jobs analyzing podcast transcripts. Extract ONLY genuinely valuable, actionable insights that matter for building great products. Be ruthlessly selective - no fluff, no generic advice."
        },
        {
          role: "user",
          content: `Extract exactly 10 key learnings from this podcast with ${guestName}.

RULES:
- Each learning must be genuinely valuable and actionable
- Write in simple, clear, powerful language
- Focus on product thinking, strategy, execution, people, impact
- 1-2 sentences max per point
- Format as bullet points with •
- NO preamble, NO "here are", JUST the bullets

Transcript (first 20k chars):
${transcript.slice(0, 20000)}

Return ONLY the 10 bulleted learnings:`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1500,
    });

    const summary = completion.choices[0]?.message?.content || 'Unable to generate summary';
    const finalSummary = `📝 Key Learnings from ${guestName}:\n\n${summary}`;

    return NextResponse.json({ summary: finalSummary });

  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({
      error: 'Failed to generate summary',
      summary: 'Unable to load the episode summary at this time. Please try again later.'
    }, { status: 500 });
  }
}
