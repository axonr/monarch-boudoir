import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const faqResponses: Record<string, string> = {
  "what's included": "Our sessions include professional styling, makeup, photography, and edited digital photos.",
  "how long": "Sessions typically last 1.5 to 4 hours depending on your package.",
  "what to wear": "Bring multiple outfit options! We recommend lingerie, robes, and pieces that make you feel confident.",
  "when photos": "You'll receive your edited photos within 2-3 weeks of your session.",
  "price": "Our packages range from $299 (Starter) to $799 (Luxury). Check our pricing section for details.",
};

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! 👋 Welcome to Monarch Boudoir. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "Great question! Feel free to call us or book a consultation to learn more.";

      for (const [key, value] of Object.entries(faqResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col h-96 z-40"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold">Chat with us</h3>
                <p className="text-xs opacity-90">Typically replies in minutes</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary/80 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100 text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
