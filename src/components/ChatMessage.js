import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
const ChatMessage = ({ role, content }) => {
    const isUser = role === "user";
    return (_jsxs("article", { className: cn("flex gap-3 p-4 animate-slide-up", isUser ? "flex-row-reverse" : "flex-row"), role: "article", "aria-label": `Message from ${isUser ? "you" : "AI assistant"}`, children: [_jsx("div", { className: cn("flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg shadow-sm", isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground border"), "aria-hidden": "true", children: isUser ? _jsx(User, { className: "h-4 w-4" }) : _jsx(Bot, { className: "h-4 w-4" }) }), _jsx("div", { className: cn("flex flex-col gap-2 max-w-[80%]", isUser ? "items-end" : "items-start"), children: _jsx("div", { className: cn("rounded-2xl px-4 py-2.5 shadow-sm", isUser
                        ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-text))]"
                        : "bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-text))] border"), children: _jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap break-words", children: content }) }) })] }));
};
export default ChatMessage;
