import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
const ChatInput = ({ onSend, disabled = false, placeholder = "Type your message..." }) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);
    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (_jsx("div", { className: "border-t bg-background p-4", children: _jsxs("form", { onSubmit: (e) => {
                e.preventDefault();
                handleSend();
            }, className: "flex gap-2 items-end", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { htmlFor: "chat-input", className: "sr-only", children: "Chat message input" }), _jsx(Textarea, { ref: textareaRef, id: "chat-input", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: placeholder, disabled: disabled, className: "min-h-[44px] max-h-[200px] resize-none", "aria-label": "Type your message here", "aria-describedby": "chat-input-help" }), _jsx("span", { id: "chat-input-help", className: "sr-only", children: "Press Enter to send, Shift+Enter for new line" })] }), _jsx(Button, { type: "submit", size: "icon", disabled: !input.trim() || disabled, className: "h-[44px] w-[44px] shrink-0", "aria-label": "Send message", children: _jsx(Send, { className: "h-4 w-4" }) })] }) }));
};
export default ChatInput;
