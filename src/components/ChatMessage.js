import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
const LinkRenderer = ({ href, children, ...props }) => {
    const isExternal = !!href && !href.startsWith("/") && !href.startsWith("#");
    return (_jsx("a", { href: href, ...props, target: isExternal ? "_blank" : undefined, rel: isExternal ? "noopener noreferrer" : undefined, className: "text-blue-600 hover:underline break-words", children: children }));
};
const ImageRenderer = ({ src, alt, title }) => (_jsx("img", { src: src, alt: alt ?? "", title: title, loading: "lazy", className: "max-w-full rounded" }));
const components = {
    // override elements for consistent styling & accessibility
    a: LinkRenderer,
    img: ImageRenderer,
    p: ({ children }) => (_jsx("p", { className: "leading-relaxed whitespace-pre-wrap break-words", children: children })),
    strong: ({ children }) => (_jsx("strong", { className: "font-semibold", children: children })),
    em: ({ children }) => _jsx("em", { className: "italic", children: children }),
    code: ({ inline, className, children }) => inline ? (_jsx("code", { className: "bg-muted px-1 rounded text-sm", children: children })) : (_jsx("pre", { className: "rounded bg-muted p-2 overflow-auto", children: _jsx("code", { className: className, children: children }) })),
    ul: ({ children }) => _jsx("ul", { className: "ml-5 list-disc", children: children }),
    ol: ({ children }) => _jsx("ol", { className: "ml-5 list-decimal", children: children }),
    li: ({ children }) => _jsx("li", { className: "my-1", children: children }),
};
const ChatMessage = ({ role, content }) => {
    const isUser = role === "user";
    return (_jsxs("article", { className: cn("flex gap-3 p-4 animate-slide-up", isUser ? "flex-row-reverse" : "flex-row"), role: "article", "aria-label": `Message from ${isUser ? "you" : "AI assistant"}`, children: [_jsx("div", { className: cn("flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg shadow-sm", isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground border"), "aria-hidden": "true", children: isUser ? _jsx(User, { className: "h-4 w-4" }) : _jsx(Bot, { className: "h-4 w-4" }) }), _jsx("div", { className: cn("flex flex-col gap-2 max-w-[80%]", isUser ? "items-end" : "items-start"), children: _jsx("div", { className: cn("rounded-2xl px-4 py-2.5 shadow-sm", isUser
                        ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-text))]"
                        : "bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-text))] border"), children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSanitize], 
                        // custom renderers for accessible, styled output
                        components: components, children: content }) }) })] }));
};
export default ChatMessage;
