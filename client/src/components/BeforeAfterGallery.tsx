import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  title: string;
  description: string;
}

const beforeAfterImages: BeforeAfterImage[] = [
  {
    id: "1",
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    title: "Confidence Transformation",
    description: "From shy to stunning - watch the transformation",
  },
  {
    id: "2",
    before: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1516795143066-f81b2b305957?w=500&h=500&fit=crop",
    title: "Empowered Beauty",
    description: "Discovering inner strength through photography",
  },
  {
    id: "3",
    before: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
    title: "Self-Love Journey",
    description: "Celebrating yourself in a whole new way",
  },
];

export function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const current = beforeAfterImages[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div ref={ref} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="relative w-full max-w-2xl mx-auto"
      >
        {/* Before/After Slider */}
        <div
          className="relative w-full aspect-square rounded-lg overflow-hidden cursor-col-resize bg-gray-200"
          onClick={handleSliderChange}
        >
          {/* After Image */}
          <img
            src={current.after}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={current.before}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${(100 / sliderPosition) * 100}%` }}
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
              <div className="flex gap-1">
                <ChevronLeft className="w-4 h-4 text-primary" />
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
            After
          </div>
        </div>

        {/* Image Info */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center mt-6"
        >
          <h3 className="text-2xl font-bold mb-2">{current.title}</h3>
          <p className="text-muted-foreground">{current.description}</p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {beforeAfterImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSliderPosition(50);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
