import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Chrome } from "lucide-react";
// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const Auth = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    useEffect(() => {
        // Check if user is already authenticated
        const checkAuth = async () => {
            const { data: { session }, } = await supabase.auth.getSession();
            if (session) {
                navigate("/", { replace: true });
            }
        };
        checkAuth();
        // Listen for auth changes
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                navigate("/", { replace: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [navigate]);
    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });
            if (error)
                throw error;
        }
        catch (error) {
            console.error("Authentication error:", error);
            toast({
                title: "Authentication Error",
                description: error instanceof Error
                    ? error.message
                    : "Failed to sign in with Google",
                variant: "destructive",
            });
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Welcome to AI Health Chatbot" }), _jsx("p", { className: "text-muted-foreground", children: "Sign in to start chatting with our AI assistant" })] }), _jsx("div", { className: "space-y-4", children: _jsxs(Button, { onClick: handleGoogleSignIn, className: "w-full h-12 text-base font-medium", size: "lg", "aria-label": "Sign in with Google", children: [_jsx(Chrome, { className: "mr-2 h-5 w-5" }), "Continue with Google"] }) }), _jsx("p", { className: "text-xs text-center text-muted-foreground", children: "By signing in, you agree to our Terms of Service and Privacy Policy" })] }) }));
};
export default Auth;
