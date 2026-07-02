import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Prepare for Your Boudoir Session: Complete Guide",
    excerpt: "Learn everything you need to know to feel confident and beautiful on your shoot day. From what to wear to mindset tips.",
    author: "Jeffery Nikolai",
    date: "June 15, 2024",
    category: "Preparation",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
    readTime: 5,
  },
  {
    id: "2",
    title: "The Psychology of Boudoir Photography: Confidence & Self-Love",
    excerpt: "Discover how boudoir photography can transform your relationship with yourself and boost your confidence.",
    author: "Jeffery Nikolai",
    date: "June 10, 2024",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    readTime: 7,
  },
  {
    id: "3",
    title: "Styling Tips for Every Body Type: What to Wear for Flattering Photos",
    excerpt: "Expert styling advice to help you feel comfortable and look your absolute best in your boudoir photos.",
    author: "Jeffery Nikolai",
    date: "June 5, 2024",
    category: "Styling",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    readTime: 6,
  },
  {
    id: "4",
    title: "Behind the Scenes: A Day in the Life of a Boudoir Photographer",
    excerpt: "Take a peek behind the curtain and see what it takes to create stunning boudoir photography.",
    author: "Jeffery Nikolai",
    date: "May 30, 2024",
    category: "Behind the Scenes",
    image: "https://images.unsplash.com/photo-1516795143066-f81b2b305957?w=600&h=400&fit=crop",
    readTime: 4,
  },
  {
    id: "5",
    title: "Makeup Tips for Camera: Look Your Best in Every Shot",
    excerpt: "Professional makeup tips specifically designed for boudoir photography to ensure you look flawless.",
    author: "Jeffery Nikolai",
    date: "May 25, 2024",
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop",
    readTime: 5,
  },
  {
    id: "6",
    title: "Gift Ideas: Why Boudoir Photos Make the Perfect Present",
    excerpt: "Looking for a unique gift? Discover why boudoir photography is the perfect present for that special someone.",
    author: "Jeffery Nikolai",
    date: "May 20, 2024",
    category: "Gifting",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    readTime: 4,
  },
];

export function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {blogPosts.map((post) => (
        <motion.div key={post.id} variants={itemVariants}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {post.category}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    {post.readTime} min read
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">By {post.author}</span>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-primary hover:bg-primary/5 mt-4"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
