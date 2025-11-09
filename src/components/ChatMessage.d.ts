interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}
declare const ChatMessage: ({ role, content }: ChatMessageProps) => import("react/jsx-runtime").JSX.Element;
export default ChatMessage;
