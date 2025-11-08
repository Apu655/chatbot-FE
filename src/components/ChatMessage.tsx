import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <article
      className={cn(
        "flex gap-3 p-4 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      role="article"
      aria-label={`Message from ${isUser ? "you" : "AI assistant"}`}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border"
        )}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-sm",
            isUser
              ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-text))]"
              : "bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-text))] border"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ChatMessage;
