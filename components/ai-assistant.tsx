"use client";

import * as React from "react";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const WELCOME_MESSAGE =
  "Hi! I'm Shubham's AI assistant. 👋 Ask me anything about his professional experience, projects, technical skills, or education.";

const SUGGESTED_QUESTIONS = [
  "Tell me about Shubham.",
  "What are his technical skills?",
  "Explain his projects.",
  "What is his experience with React and Node.js?",
  "Tell me about his Agentic AI knowledge.",
];

export function AiAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [unreadCount, setUnreadCount] = React.useState(1);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = (questionText || input).trim();
    if (!textToSend || isLoading) return;

    setError(null);
    const userMsg: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const assistantReply =
        data.reply ||
        "I received your message, but could not produce a response. Please try again.";

      const assistantMsg: Message = {
        id: "ai-" + Date.now(),
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("[AiAssistant]", err);
      setError("Unable to reach the assistant right now. Please try again.");
      const fallbackMsg: Message = {
        id: "err-" + Date.now(),
        role: "assistant",
        content:
          "I apologize, but I encountered a momentary connection issue. You can try asking again or reach out to Shubham directly at **shubhambhoyar111222@gmail.com**.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content: WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setError(null);
  };

  const handleCopyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  // Render markdown-like simple formatting for bot responses
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Check if bullet point
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*");
      const cleanLine = isBullet
        ? line.trim().replace(/^[•\-\*]\s*/, "")
        : line;

      // Parse bold **text** and links [text](url)
      const parts = cleanLine.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a
                key={pIdx}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:opacity-80 inline-flex items-center gap-0.5"
              >
                {match[1]}
                <ExternalLink className="h-2.5 w-2.5 inline" />
              </a>
            );
          }
        }
        return <span key={pIdx}>{part}</span>;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-sm leading-relaxed">
            <span className="text-primary font-bold mt-1 text-xs">•</span>
            <div className="flex-1">{parsedLine}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1.5 text-sm leading-relaxed">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Floating AI Assistant Launcher Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-primary-foreground/20 cursor-pointer"
            aria-label="Open AI Portfolio Assistant"
          >
            <div className="relative">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight flex items-center gap-1.5">
                Ask AI Assistant
              </span>
              <span className="text-[10px] text-primary-foreground/80 leading-tight hidden sm:inline">
                Shubham&apos;s Portfolio
              </span>
            </div>

            {unreadCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-background text-foreground text-[10px] font-bold">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* 2. Floating AI Assistant Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant Window"
          className="fixed bottom-4 right-3 sm:right-6 sm:bottom-6 z-50 w-[calc(100vw-24px)] sm:w-[420px] h-[580px] max-h-[88vh] flex flex-col rounded-3xl bg-card/95 dark:bg-card/90 backdrop-blur-2xl border border-border/80 shadow-2xl shadow-black/25 dark:shadow-black/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-muted/60 dark:bg-muted/40 border-b border-border/70 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative p-2 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-foreground">
                    Shubham&apos;s AI Assistant
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">
                    Free Gemini AI
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Grounded in verified portfolio data
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetChat}
                className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                title="Restart Conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                title="Close Assistant"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-1 max-w-[88%] sm:max-w-[85%]",
                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className="flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground font-mono">
                    <span>{isUser ? "You" : "Portfolio AI"}</span>
                    <span>•</span>
                    <span>{message.timestamp}</span>
                  </div>

                  <div
                    className={cn(
                      "p-3 sm:p-3.5 rounded-2xl text-sm transition-all duration-200 relative group",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20"
                        : "bg-muted/70 dark:bg-muted/50 border border-border/70 text-foreground rounded-tl-sm shadow-xs"
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    ) : (
                      <div className="text-foreground/95">
                        {renderFormattedContent(message.content)}
                      </div>
                    )}

                    {!isUser && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 rounded bg-background/50 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500 font-mono">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span className="font-mono">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col gap-1 mr-auto items-start max-w-[85%] animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground font-mono">
                  <span>Portfolio AI</span>
                  <span>•</span>
                  <span>Thinking...</span>
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-muted/70 dark:bg-muted/50 border border-border/70 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  </div>
                  <span className="text-xs text-muted-foreground">Consulting portfolio knowledge...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Drawer */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-3 py-2 border-t border-border/50 bg-muted/20">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Suggested Questions:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-left text-[11px] px-2.5 py-1 rounded-full bg-background hover:bg-primary/10 border border-border/70 hover:border-primary/40 text-foreground/80 hover:text-primary transition-all duration-150 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Footer */}
          <div className="p-3 bg-muted/40 dark:bg-muted/30 border-t border-border/70 shrink-0">
            <div className="relative flex items-center gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Shubham's experience, skills, projects..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-xl border border-border/80 bg-background px-3.5 py-2.5 pr-11 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 max-h-24 min-h-[42px]"
              />

              <Button
                size="icon"
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg shrink-0 transition-transform active:scale-95"
                title="Send message (Enter)"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground">
              <span>Press <kbd className="font-mono bg-muted px-1 py-0.5 rounded border border-border/60">Enter</kbd> to send</span>
              <span className="truncate">Strictly answers from portfolio</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

