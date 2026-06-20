import { useState, useEffect, useRef } from "react";
import { Send, Gift } from "lucide-react";
import { initialMessages, mockMessages, type ChatMessage } from "@/data/liveData";
import { cn } from "@/lib/utils";

let msgCounter = 100;

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const newMsg: ChatMessage = { ...template, id: String(msgCounter++) };
      setMessages((prev) => [...prev.slice(-40), newMsg]);
    }, 1500 + Math.random() * 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: String(msgCounter++),
      username: "我",
      text: input.trim(),
      color: "hsl(var(--primary))",
      type: "normal",
    };
    setMessages((prev) => [...prev.slice(-40), newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-slide-up">
            {msg.type === "gift" ? (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                <Gift className="w-3 h-3 text-red-400 shrink-0" />
                <span className="text-xs font-medium" style={{ color: msg.color }}>{msg.username}</span>
                <span className="text-xs text-muted-foreground">{msg.text}</span>
              </div>
            ) : msg.type === "purchase" ? (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gain/10 border border-gain/20">
                <span className="text-[10px] text-gain font-medium shrink-0">购买</span>
                <span className="text-xs font-medium" style={{ color: msg.color }}>{msg.username}</span>
                <span className="text-xs text-muted-foreground truncate">{msg.text}</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <span className={cn("text-xs font-medium shrink-0")} style={{ color: msg.color }}>
                  {msg.username}：
                </span>
                <span className="text-xs text-foreground/80 break-all">{msg.text}</span>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-none px-3 py-3 border-t border-border flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="说点什么..."
          maxLength={50}
          className="flex-1 h-8 px-3 rounded-lg bg-surface-base border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
        />
        <button
          onClick={send}
          className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors shrink-0">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
