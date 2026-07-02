import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

type PortfolioCategory = "all" | "bridal" | "boudoir" | "couples" | "editorial";

interface PortfolioImage {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "all">;
  image: string;
  description: string;
}

// Portfolio gallery data with Unsplash images
const portfolioImages: PortfolioImage[] = [
  {
    id: "1",
    title: "Bridal Elegance",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
    description: "Timeless bridal portraits capturing the essence of your special day",
  },
  {
    id: "2",
    title: "Intimate Moments",
    category: "boudoir",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop",
    description: "Sensual and empowering boudoir photography celebrating confidence",
  },
  {
    id: "3",
    title: "Couples Connection",
    category: "couples",
    image: "https://images.unsplash.com/photo-1516795143066-f81b2b305957?w=600&h=600&fit=crop",
    description: "Romantic couples sessions capturing genuine connection and love",
  },
  {
    id: "4",
    title: "Editorial Style",
    category: "editorial",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop",
    description: "High-fashion editorial photography with artistic direction",
  },
  {
    id: "5",
    title: "Bridal Details",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
    description: "Close-up bridal portraits highlighting elegance and grace",
  },
  {
    id: "6",
    title: "Confidence & Beauty",
    category: "boudoir",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
    description: "Empowering boudoir sessions celebrating self-love and confidence",
  },
  {
    id: "7",
    title: "Romantic Couples",
    category: "couples",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=600&fit=crop",
    description: "Intimate couple portraits in romantic settings",
  },
  {
    id: "8",
    title: "Fashion Forward",
    category: "editorial",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    description: "Contemporary editorial work with bold styling and concepts",
  },
  {
    id: "9",
    title: "Bridal Radiance",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    description: "Radiant bridal portraits celebrating your beauty",
  },
];

const categories: { value: PortfolioCategory; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "bridal", label: "Bridal" },
  { value: "boudoir", label: "Boudoir" },
  { value: "couples", label: "Couples" },
  { value: "editorial", label: "Editorial" },
];

interface PortfolioGalleryProps {
  onImageClick?: (image: PortfolioImage) => void;
}

export function PortfolioGallery({ onImageClick }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("all");
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") {
      return portfolioImages;
    }
    return portfolioImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div ref={ref} className="w-full">
      {/* Category Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-primary/10 text-foreground hover:bg-primary/20"
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              layout
              onClick={() => {
                setSelectedImage(image);
                onImageClick?.(image);
              }}
              className="cursor-pointer group"
            >
              <Card className="overflow-hidden h-80 border-primary/10 hover:border-primary/30 transition-all">
                <div className="relative w-full h-full overflow-hidden bg-accent/5">
                  {/* Image */}
                  <motion.img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
                  >
                    <h3 className="text-white font-serif text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                  </motion.div>

                  {/* Hover Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-lg">+</span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Image */}
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full rounded-lg"
              />

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-white"
              >
                <h2 className="font-serif text-3xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-white/80 text-lg">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
