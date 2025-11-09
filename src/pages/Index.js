import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bot, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
    const { messages, isLoading, sendMessage, messagesEndRef } = useChat();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState({
        email: "",
        full_name: "",
        email_verified: false,
    });
    const getAuthSession = async () => {
        const { data: { session }, } = await supabase.auth.getSession();
        console.log("Session : ", session);
        setUser({ ...user, full_name: session?.user?.user_metadata?.full_name });
        if (session?.user?.role !== "authenticated") {
            navigate("/auth");
        }
    };
    useEffect(() => {
        document.title = "AI Chatbot - Intelligent Conversations";
        getAuthSession();
    }, []);
    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error)
                throw error;
            navigate("/auth", { replace: true });
        }
        catch (error) {
            console.error("Sign out error:", error);
            toast({
                title: "Error",
                description: "Failed to sign out",
                variant: "destructive",
            });
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-screen bg-gradient-to-b from-background to-muted", children: [_jsx("header", { className: "border-b bg-card shadow-sm", role: "banner", children: _jsx("div", { className: "container mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md", children: _jsx(Bot, { className: "h-5 w-5", "aria-hidden": "true" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-foreground", children: "AI Chatbot" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Your intelligent assistant" })] })] }), _jsxs("div", { className: "", children: [user && user.full_name, _jsx(Button, { onClick: handleSignOut, variant: "ghost", size: "sm", "aria-label": "Sign out", children: _jsx(LogOut, { className: "h-5 w-5" }) })] })] }) }) }), _jsx("main", { className: "flex-1 overflow-y-auto chat-scrollbar chat-scroll-smooth", role: "main", "aria-label": "Chat conversation", children: _jsxs("div", { className: "container mx-auto max-w-4xl px-4", children: [messages.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 text-center", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 shadow-lg", children: _jsx(Bot, { className: "h-8 w-8", "aria-hidden": "true" }) }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: "Welcome to Health AI Chatbot" }), _jsx("p", { className: "text-muted-foreground max-w-md", children: "Start a conversation by typing your message below. I'm here to help with any questions you have!" })] })), messages.map((message, index) => (_jsx(ChatMessage, { role: message.role, content: message.content }, `${message.role}-${index}`))), isLoading && _jsx(TypingIndicator, {}), _jsx("div", { ref: messagesEndRef, "aria-hidden": "true" })] }) }), _jsx("footer", { role: "contentinfo", "aria-label": "Message input area", children: _jsx("div", { className: "container mx-auto max-w-4xl", children: _jsx(ChatInput, { onSend: sendMessage, disabled: isLoading, placeholder: isLoading ? "AI is thinking..." : "Type your message..." }) }) })] }));
};
export default Index;
