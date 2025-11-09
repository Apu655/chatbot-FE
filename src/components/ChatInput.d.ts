interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}
declare const ChatInput: ({ onSend, disabled, placeholder }: ChatInputProps) => import("react/jsx-runtime").JSX.Element;
export default ChatInput;
