/**
 * AI Router — Smart Failover Layer
 * Cycles through multiple AI providers automatically.
 * Priority: Gemini → Claude → GPT-4o
 * Falls back to next provider on timeout or error.
 */

export type AIProvider = "gemini" | "claude" | "openai";

interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AICompletionOptions {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

interface AIResponse {
  text: string;
  provider: AIProvider;
  tokens?: number;
}

// Provider order — primary first, fallbacks follow
const PROVIDER_ORDER: AIProvider[] = ["gemini", "claude", "openai"];

/* ============================================
   PROVIDER ADAPTERS
   Each calls the corresponding Next.js API route
   which holds the API key server-side.
============================================ */
async function callGemini(opts: AICompletionOptions): Promise<string> {
  const res = await fetch("/api/ai/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
    signal: AbortSignal.timeout(15_000), // 15s timeout
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  return data.text;
}

async function callClaude(opts: AICompletionOptions): Promise<string> {
  const res = await fetch("/api/ai/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Claude error: ${res.status}`);
  const data = await res.json();
  return data.text;
}

async function callOpenAI(opts: AICompletionOptions): Promise<string> {
  const res = await fetch("/api/ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return data.text;
}

const providerCallers: Record<AIProvider, (opts: AICompletionOptions) => Promise<string>> = {
  gemini: callGemini,
  claude: callClaude,
  openai: callOpenAI,
};

/* ============================================
   MAIN ROUTER — Tries each provider in order
============================================ */
export async function aiComplete(opts: AICompletionOptions): Promise<AIResponse> {
  const errors: Record<string, string> = {};

  for (const provider of PROVIDER_ORDER) {
    try {
      console.log(`[AI Router] Trying provider: ${provider}`);
      const text = await providerCallers[provider](opts);
      console.log(`[AI Router] Success with: ${provider}`);
      return { text, provider };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[AI Router] Provider ${provider} failed: ${message}`);
      errors[provider] = message;
    }
  }

  // All providers failed
  throw new Error(
    `All AI providers failed:\n${Object.entries(errors)
      .map(([p, e]) => `  ${p}: ${e}`)
      .join("\n")}`
  );
}

/* ============================================
   CONTENT WRITER HELPERS
============================================ */
export async function generateHeadline(context: string): Promise<string> {
  const { text } = await aiComplete({
    messages: [
      {
        role: "user",
        content: `Write 3 powerful, conversion-focused headline variations for: ${context}. Return only the headlines, one per line, no numbering.`,
      },
    ],
    temperature: 0.8,
    maxTokens: 200,
  });
  return text;
}

export async function generateBio(name: string, niche: string): Promise<string> {
  const { text } = await aiComplete({
    messages: [
      {
        role: "user",
        content: `Write a compelling 2-sentence professional bio for ${name}, a ${niche}. Be confident, concise, and human.`,
      },
    ],
    temperature: 0.7,
    maxTokens: 150,
  });
  return text;
}

export async function generateSocialPost(topic: string, platform: string): Promise<string> {
  const { text } = await aiComplete({
    messages: [
      {
        role: "user",
        content: `Write an engaging ${platform} post about: ${topic}. Match the tone and format of ${platform}. Include relevant emojis.`,
      },
    ],
    temperature: 0.9,
    maxTokens: 300,
  });
  return text;
}

export async function generateLandingPageCopy(product: string, audience: string): Promise<string> {
  const { text } = await aiComplete({
    messages: [
      {
        role: "user",
        content: `Write a full landing page copy for "${product}" targeting "${audience}":
- Hero headline (punchy, 8 words max)
- Sub-headline (25 words, value-driven)
- 3 feature bullets with emoji
- CTA button text (3 words)
- Social proof sentence

Format as JSON with keys: headline, subheadline, features (array), cta, socialProof`,
      },
    ],
    temperature: 0.75,
    maxTokens: 600,
  });
  return text;
}
