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
    const {
      data: { session },
    } = await supabase.auth.getSession();
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
      if (error) throw error;
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card shadow-sm" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  AI Chatbot
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your intelligent assistant
                </p>
              </div>
            </div>
            <div className="">
              {user && user.full_name}
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main
        className="flex-1 overflow-y-auto chat-scrollbar chat-scroll-smooth"
        role="main"
        aria-label="Chat conversation"
      >
        <div className="container mx-auto max-w-4xl px-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 shadow-lg">
                <Bot className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Health AI Chatbot
              </h2>
              <p className="text-muted-foreground max-w-md">
                Start a conversation by typing your message below. I'm here to
                help with any questions you have!
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.role}-${index}`}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </main>

      {/* Input Area */}
      <footer role="contentinfo" aria-label="Message input area">
        <div className="container mx-auto max-w-4xl">
          <ChatInput
            onSend={sendMessage}
            disabled={isLoading}
            placeholder={
              isLoading ? "AI is thinking..." : "Type your message..."
            }
          />
        </div>
      </footer>
    </div>
  );
};

export default Index;
