import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
export const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Set up auth state listener FIRST
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (!session) {
                navigate("/auth", { replace: true });
            }
            setLoading(false);
        });
        // THEN check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (!session) {
                navigate("/auth", { replace: true });
            }
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, [navigate]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "space-y-4 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "text-muted-foreground", children: "Loading..." })] }) }));
    }
    if (!user || !session) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
};
