interface Message {
    role: "user" | "assistant";
    content: string;
}
export declare const useChat: () => {
    messages: Message[];
    isLoading: boolean;
    sendMessage: (content: string) => Promise<void>;
    messagesEndRef: import("react").RefObject<HTMLDivElement>;
};
export {};
