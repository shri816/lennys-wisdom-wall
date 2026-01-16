const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk').default;

async function generateSummaries() {
  // Read the categorized data to get all unique guests
  const dataPath = path.join(__dirname, '../app/categorized-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Get unique guest names from guestQuoted field
  const uniqueGuests = [...new Set(data.concepts.map(c => c.guestQuoted))];

  console.log(`Found ${uniqueGuests.length} unique guests to summarize`);

  const transcriptsDir = "/Users/shrikantkadu/Desktop/Lenny's Podcast Transcripts Archive [public]";
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const summaries = {};
  let successCount = 0;
  let failCount = 0;

  for (const guestName of uniqueGuests) {
    console.log(`\nProcessing: ${guestName}...`);

    try {
      // Try to find the transcript file
      let transcriptPath = path.join(transcriptsDir, `${guestName}.txt`);

      // If exact match doesn't exist, try fuzzy match
      if (!fs.existsSync(transcriptPath)) {
        const files = fs.readdirSync(transcriptsDir);
        const matchingFile = files.find(file =>
          file.toLowerCase().includes(guestName.toLowerCase().split(' ')[0]) ||
          file.toLowerCase().includes(guestName.toLowerCase().split(' ')[1] || '')
        );

        if (matchingFile) {
          transcriptPath = path.join(transcriptsDir, matchingFile);
          console.log(`  Found transcript: ${matchingFile}`);
        } else {
          console.log(`  ⚠️  No transcript found for ${guestName}`);
          summaries[guestName] = `Transcript not found for ${guestName}. The episode summary will be available once the transcript is processed.`;
          failCount++;
          continue;
        }
      }

      // Read the transcript
      const transcript = fs.readFileSync(transcriptPath, 'utf-8');

      // Generate summary using Groq
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
      summaries[guestName] = `📝 Key Learnings from ${guestName}:\n\n${summary}`;
      successCount++;
      console.log(`  ✓ Generated summary`);

      // Add a small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      summaries[guestName] = 'Unable to load the episode summary at this time. Please try again later.';
      failCount++;
    }
  }

  // Save summaries to JSON file
  const outputPath = path.join(__dirname, '../app/guest-summaries.json');
  fs.writeFileSync(outputPath, JSON.stringify(summaries, null, 2));

  console.log(`\n✅ Done! Generated summaries for ${successCount}/${uniqueGuests.length} guests`);
  console.log(`📁 Saved to: ${outputPath}`);
  if (failCount > 0) {
    console.log(`⚠️  Failed: ${failCount} guests`);
  }
}

generateSummaries().catch(console.error);
