import { useState, useCallback, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
const getSessionId = () => {
    const KEY = "chat_session_id";
    let sid = localStorage.getItem(KEY);
    if (!sid) {
        // Use a stable, random session id per browser
        sid =
            globalThis.crypto && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(KEY, sid);
    }
    return sid;
};
const CHAT_API_URL = 
// import.meta.env.VITE_CHAT_API_URL ||
"https://chatbot-be-zvln.onrender.com/chat";
export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);
    const sendMessage = useCallback(async (content) => {
        const userMessage = { role: "user", content };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        try {
            const sessionId = getSessionId();
            const response = await fetch(CHAT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: content,
                }),
            });
            // Handle non-2xx responses with readable errors
            if (!response.ok) {
                // 🔹 NEW: special handling for 5xx server errors
                if (response.status >= 500) {
                    const assistantMessage = {
                        role: "assistant",
                        content: "I’m unable to answer that right now. Can you kindly try again?",
                    };
                    setMessages((prev) => [...prev, assistantMessage]);
                    // Optional: soft toast, but not destructive
                    toast({
                        title: "Temporary issue",
                        description: "The server had a problem processing your request. Please try again in a moment.",
                    });
                    // We handled it gracefully — don’t throw, don’t roll back
                    return;
                }
                // For non-5xx errors, keep current behavior
                let serverMsg = "";
                try {
                    const data = await response.json();
                    serverMsg = data?.error || data?.message || "";
                }
                catch {
                    // ignore: response may not be JSON
                }
                const friendly = serverMsg ||
                    (response.status === 429
                        ? "Rate limit exceeded. Please try again shortly."
                        : response.status === 402
                            ? "Service requires payment. Please add credits."
                            : `Request failed (${response.status}).`);
                throw new Error(friendly);
            }
            // Expecting JSON: { text: string }
            let data = null;
            try {
                data = await response.json();
            }
            catch {
                throw new Error("Invalid server response (expected JSON).");
            }
            const assistantText = (data && typeof data.text === "string" && data.text.trim()) || "…";
            const assistantMessage = {
                role: "assistant",
                content: assistantText,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
        catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send message",
                variant: "destructive",
            });
            // ⛔ Keep current rollback behavior ONLY for non-5xx errors
            // (5xx path above returns early and never reaches here)
            setMessages((prev) => prev.filter((msg) => !(msg.role === "user" && msg.content === content)));
        }
        finally {
            setIsLoading(false);
        }
    }, [toast]);
    return { messages, isLoading, sendMessage, messagesEndRef };
};
