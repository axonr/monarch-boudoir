import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, MessageCircle, Share2, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  hashtags: string[];
}

const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    likes: 342,
    comments: 28,
    caption: "Confidence looks beautiful on everyone 💕",
    hashtags: ["#MonarchBoudoir", "#BoudoirPhotography", "#ConfidenceIsKey"],
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    likes: 521,
    comments: 45,
    caption: "Celebrating you in every frame ✨",
    hashtags: ["#MonarchBoudoir", "#LuxuryPortraits", "#SelfLove"],
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    likes: 289,
    comments: 22,
    caption: "Your story deserves to be told beautifully 📸",
    hashtags: ["#MonarchBoudoir", "#PhotographyArt", "#WomenEmpowerment"],
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1516795143066-f81b2b305957?w=300&h=300&fit=crop",
    likes: 456,
    comments: 38,
    caption: "Elegance is an attitude 👑",
    hashtags: ["#MonarchBoudoir", "#LuxuryBrand", "#PortraitPhotography"],
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
    likes: 378,
    comments: 31,
    caption: "Every woman is a masterpiece 🎨",
    hashtags: ["#MonarchBoudoir", "#ArtisticPhotography", "#BeautyInAll"],
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop",
    likes: 612,
    comments: 52,
    caption: "Empowerment through the lens 💪",
    hashtags: ["#MonarchBoudoir", "#WomenInFocus", "#ConfidenceJourney"],
  },
];

export function InstagramFeed() {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="space-y-12">
      {/* Follow CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center"
      >
        <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 flex items-center gap-2 mx-auto px-8 py-3">
          <Instagram className="w-5 h-5" />
          Follow @MonarchBoudoir
        </Button>
        <p className="text-muted-foreground mt-4 text-sm">
          Join 5,000+ followers for daily inspiration and behind-the-scenes content
        </p>
      </motion.div>

      {/* Instagram Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {instagramPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square cursor-pointer"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-8 text-white">
                <div className="flex flex-col items-center gap-2">
                  <Heart className="w-6 h-6 fill-current" />
                  <span className="text-sm font-semibold">{post.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm font-semibold">{post.comments}</span>
                </div>
              </div>
            </div>

            {/* Instagram Icon */}
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Instagram className="w-4 h-4 text-white" />
            </div>

            {/* Caption on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm line-clamp-2">{post.caption}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View More CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-center"
      >
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5"
        >
          View All Posts on Instagram
          <Share2 className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
