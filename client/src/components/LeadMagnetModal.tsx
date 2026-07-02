import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LeadMagnetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Show modal after 30 seconds or on exit intent
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 30000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold mb-2">Get Your Free Guide</h2>
                <p className="text-muted-foreground mb-6">
                  Download our "Pre-Session Confidence Checklist" - everything you need to feel amazing on your shoot day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Free Guide
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-2xl">✓</span>
                </motion.div>
                <h3 className="text-lg font-bold mb-2">Check Your Email!</h3>
                <p className="text-muted-foreground text-sm">
                  Your free guide is on its way. Look for it in your inbox.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
