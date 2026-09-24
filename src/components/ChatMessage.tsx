import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const LinkRenderer = ({ href, children, ...props }: any) => {
  const isExternal = !!href && !href.startsWith("/") && !href.startsWith("#");
  return (
    <a
      href={href}
      {...props}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-blue-600 hover:underline break-words"
    >
      {children}
    </a>
  );
};

const ImageRenderer = ({ src, alt, title }: any) => (
  <img
    src={src}
    alt={alt ?? ""}
    title={title}
    loading="lazy"
    className="max-w-full rounded"
  />
);

const components = {
  // override elements for consistent styling & accessibility
  a: LinkRenderer,
  img: ImageRenderer,
  p: ({ children }: any) => (
    <p className="leading-relaxed whitespace-pre-wrap break-words">
      {children}
    </p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: any) => <em className="italic">{children}</em>,
  code: ({ inline, className, children }: any) =>
    inline ? (
      <code className="bg-muted px-1 rounded text-sm">{children}</code>
    ) : (
      <pre className="rounded bg-muted p-2 overflow-auto">
        <code className={className}>{children}</code>
      </pre>
    ),
  ul: ({ children }: any) => <ul className="ml-5 list-disc">{children}</ul>,
  ol: ({ children }: any) => <ol className="ml-5 list-decimal">{children}</ol>,
  li: ({ children }: any) => <li className="my-1">{children}</li>,
};

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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            // custom renderers for accessible, styled output
            components={components}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default ChatMessage;
