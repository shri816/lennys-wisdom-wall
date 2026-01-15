# Lenny's Wisdom Wall - Product Roadmap

## Current State (MVP v1)

✅ **What's Built:**
- 37 manually curated concepts from ~10 episodes
- 8 organized categories with color coding & icons
- Category filtering
- Beautiful UI matching Lenny's brand (#FF6B35 orange, cream background)
- Responsive design
- Click-through to detailed insights
- Logo placeholder (needs actual Lenny logo)

## To Truly Impress Lenny & Add Real Value

### Phase 2: Comprehensive Coverage (CRITICAL)
**Problem:** Only 37 concepts from 286 episodes (~13% coverage)

**Solution:**
1. Extract 150-200 concepts from ALL 286 episodes using AI
2. Add episode numbers and links to each concept
3. Show which episodes discussed each topic
4. Add timestamps where possible

**Impact:** Shows you actually used the full dataset, not just 10 episodes

---

### Phase 3: Search & Discovery
**Problem:** Users can't find specific topics quickly

**Features to Add:**
- Full-text search across all concepts
- Search by guest name
- "Most discussed" topics (bubble size based on frequency)
- Trending topics (if you add analytics)

---

### Phase 4: Interactive Knowledge Graph (THE WOW FACTOR)
**Problem:** Relationships between concepts aren't visual

**Solution:**
- Bring back the force-directed graph visualization (fix the errors)
- Show how concepts connect (Strategy → Execution → Metrics)
- Make it explorable and beautiful
- Add zoom/pan controls

**Why This Matters:** This is what makes it "Wisdom WALL" not just a list

---

### Phase 5: Community Features
**Features:**
- Let users "bookmark" favorite concepts
- Share specific insights on Twitter with pre-filled text
- Track which concepts are most viewed
- "Related episodes you might like" recommendations

---

### Phase 6: Real Logo & Polish
- Get actual Lenny's Podcast logo (ask Lenny or get from website)
- Add episode artwork/thumbnails
- Better mobile experience
- Add animations/micro-interactions

---

## What Makes This Valuable to Users?

### Current Value (MVP):
- Quick reference for PM concepts
- Browse by category
- See who said what

### Potential Value (Full Version):
1. **Learning Tool:** "I want to learn about pricing" → see all pricing insights + which episodes to listen to
2. **Reference Database:** "What did Shreyas say about OKRs?" → instant answer
3. **Discovery Engine:** "I liked this concept, what's related?" → knowledge graph exploration
4. **Career Resource:** PMs bookmark concepts relevant to their current challenges
5. **SEO Goldmine:** Each concept page ranks for "{concept} + Lenny's podcast"

---

## Quick Wins to Ship Next

1. **Add Real Logo** - Download from lennyspodcast.com
2. **Link to Episodes** - Add "Listen to Episode #123" buttons
3. **Extract 50 More Concepts** - Get to 100 total (after 6:30pm when rate limit resets)
4. **Add Search Bar** - Simple text search across concept names
5. **Social Sharing** - "Share this insight" button with pre-filled tweet

---

## Technical Debt to Fix

- [ ] Replace logo placeholder with real logo
- [ ] Add proper TypeScript types
- [ ] Fix force-graph visualization errors (or use different library)
- [ ] Add episode data (number, title, date, URL)
- [ ] Implement search functionality
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Deploy to custom domain (lennywisdom.com?)

---

## How to Get Lenny's Attention

### Option A: Show Him the MVP
- Tweet at @lennysan with a demo
- "Built a knowledge graph of your 286 episodes. Early prototype at [URL]"
- Include a screenshot of the categorized view
- Ask for feedback

### Option B: Ship V2 First
- Wait for rate limit reset (6:30pm)
- Extract 100-150 concepts
- Fix the graph visualization
- Add episode links
- Make it REALLY impressive
- Then show Lenny

**Recommendation: Option B** - You only get one shot at a first impression

---

## Current Stats
- **37 concepts** across 8 categories
- **~13% coverage** of 286 episodes
- **~10 episodes** deeply analyzed
- **25+ unique guests** referenced

## Target Stats for V2
- **150+ concepts** across 8 categories
- **75%+ coverage** of 286 episodes
- **100+ episodes** analyzed
- **75+ unique guests** referenced
- **Full-text search** working
- **Interactive graph** visualization
- **Episode links** for every concept

---

## Questions to Answer

1. **Logo:** Can you download Lenny's logo from his website, or should we design a placeholder?
2. **Episode Data:** Do you have episode numbers/titles/URLs, or should we scrape them?
3. **Timeline:** When do you want to show this to Lenny?
4. **Scope:** MVP now, or wait for V2 with more concepts?

---

**Bottom Line:**

The current MVP is a good proof of concept but wouldn't truly impress someone like Lenny who created this content. After 6:30pm, we should extract 100-150 more concepts to show comprehensive coverage. That's the difference between "neat idea" and "holy shit this is useful."
