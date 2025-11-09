import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot } from "lucide-react";
const TypingIndicator = () => {
    return (_jsxs("article", { className: "flex gap-3 p-4 animate-slide-up", role: "article", "aria-label": "AI assistant is typing", "aria-live": "polite", children: [_jsx("div", { className: "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg shadow-sm bg-card text-card-foreground border", "aria-hidden": "true", children: _jsx(Bot, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex flex-col gap-2 items-start", children: _jsx("div", { className: "rounded-2xl px-4 py-2.5 shadow-sm bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-text))] border", children: _jsxs("div", { className: "flex gap-1 items-center", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-current animate-pulse-dot", style: { animationDelay: "0ms" } }), _jsx("div", { className: "w-2 h-2 rounded-full bg-current animate-pulse-dot", style: { animationDelay: "200ms" } }), _jsx("div", { className: "w-2 h-2 rounded-full bg-current animate-pulse-dot", style: { animationDelay: "400ms" } })] }) }) })] }));
};
export default TypingIndicator;
