import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, getLocalFallbackResponse } from "@/lib/knowledge-base";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body?.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. 'messages' array is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== "string" || !lastMessage.content.trim()) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const userQuery = lastMessage.content.trim();
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const model = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash";

    // If Gemini API Key is not configured, seamlessly respond from structured knowledge base
    if (!apiKey) {
      const fallbackReply = getLocalFallbackResponse(userQuery);
      return NextResponse.json({
        reply: fallbackReply,
        source: "knowledge-base",
        geminiConfigured: false,
      });
    }

    // Format conversation history for Gemini API (max last 8 messages for context)
    const recentMessages = messages.slice(-8);
    const contents = recentMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Ensure first message has role "user" per Gemini requirements
    if (contents.length > 0 && contents[0].role !== "user") {
      contents.shift();
    }

    const systemPrompt = buildSystemPrompt();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    };

    try {
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Gemini API Warning] Status ${response.status}: ${errorText}`);

        // If rate-limited or model issue, gracefully fall back to local knowledge base
        const fallbackReply = getLocalFallbackResponse(userQuery);
        return NextResponse.json({
          reply: fallbackReply,
          source: "knowledge-base-fallback",
          geminiConfigured: true,
          geminiError: `Gemini API returned status ${response.status}. Fallback activated.`,
        });
      }

      const data = await response.json();
      const answerText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        getLocalFallbackResponse(userQuery);

      return NextResponse.json({
        reply: answerText,
        source: "gemini",
        geminiConfigured: true,
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.warn("[Gemini API Fetch Error]", fetchError?.message);

      const fallbackReply = getLocalFallbackResponse(userQuery);
      return NextResponse.json({
        reply: fallbackReply,
        source: "knowledge-base-fallback",
        geminiConfigured: true,
      });
    }
  } catch (error: any) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      {
        error: "Internal server error occurred while processing message.",
        reply:
          "I apologize, but I encountered an unexpected error. Please try asking again or reach out to Shubham directly via email at shubhambhoyar111222@gmail.com.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    name: "Shubham Bhoyar AI Assistant",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  });
}

