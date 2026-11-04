export async function completeTutor(
  apiKey: string,
  messages: Array<{ role: "system" | "user"; content: string }>,
  maxTokens: number,
): Promise<string> {
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      temperature: 0.3,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages,
    }),
  });
  if (!response.ok) {
    throw new Error(`xAI API error ${response.status}`);
  }
  const body = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = body.choices?.[0]?.message?.content ?? "";
  if (!text.trim()) throw new Error("empty model response");
  return text;
}
