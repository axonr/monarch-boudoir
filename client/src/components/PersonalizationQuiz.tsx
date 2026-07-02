import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface PackageRecommendation {
  name: string;
  price: string;
  reason: string;
  features: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary goal for this session?",
    options: [
      "Personal empowerment & self-love",
      "Celebrate a milestone",
      "Gift for someone special",
      "Relationship strengthening",
    ],
  },
  {
    id: 2,
    question: "How much time can you dedicate?",
    options: ["1-2 hours", "2-3 hours", "3-4 hours", "As long as needed"],
  },
  {
    id: 3,
    question: "What's your style preference?",
    options: ["Classic & elegant", "Bold & empowering", "Romantic & soft", "Artistic & editorial"],
  },
  {
    id: 4,
    question: "How many outfit changes would you like?",
    options: ["1-2 outfits", "3-4 outfits", "5+ outfits", "Unlimited"],
  },
];

const packageRecommendations: Record<string, PackageRecommendation> = {
  starter: {
    name: "Starter Package",
    price: "$299",
    reason: "Perfect for first-timers who want to experience the magic",
    features: [
      "1.5-hour session",
      "Professional styling & makeup",
      "50+ edited photos",
      "Digital gallery access",
    ],
  },
  signature: {
    name: "Signature Package",
    price: "$499",
    reason: "Most popular! Great balance of time and photos",
    features: [
      "2.5-hour session",
      "Premium styling & makeup",
      "100+ edited photos",
      "Multiple outfit changes",
      "Private online gallery",
    ],
  },
  luxury: {
    name: "Luxury Package",
    price: "$799",
    reason: "The ultimate experience for those who want it all",
    features: [
      "4-hour session",
      "Luxury styling & makeup",
      "150+ edited photos",
      "Unlimited outfit changes",
      "Premium album included",
    ],
  },
};

export function PersonalizationQuiz() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const getRecommendation = (): PackageRecommendation => {
    // Simple recommendation logic based on time preference
    if (answers[1]?.includes("1-2")) return packageRecommendations.starter;
    if (answers[1]?.includes("3-4") || answers[1]?.includes("As long")) {
      return packageRecommendations.luxury;
    }
    return packageRecommendations.signature;
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span className="text-muted-foreground">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <div>
              <motion.h3
                key={currentQuestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold mb-6"
              >
                {quizQuestions[currentQuestion].question}
              </motion.h3>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <span className="font-medium">{option}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-8"
          >
            {/* Recommendation */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="text-3xl font-bold">Your Perfect Package</h3>
              <p className="text-muted-foreground">{getRecommendation().reason}</p>
            </div>

            {/* Package Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="space-y-4">
                <div>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide">Recommended</p>
                  <h4 className="text-3xl font-bold mt-2">{getRecommendation().name}</h4>
                  <p className="text-2xl text-primary font-bold mt-2">{getRecommendation().price}</p>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  {getRecommendation().features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                  Book {getRecommendation().name}
                </Button>
              </div>
            </Card>

            {/* Other Options */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Not quite right? View all packages</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Retake Quiz
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  View All Packages
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
