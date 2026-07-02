import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";

interface VideoTestimonial {
  id: string;
  title: string;
  clientName: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    title: "Life-Changing Experience",
    clientName: "Sarah M.",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "This experience completely changed how I see myself. I felt so empowered.",
  },
  {
    id: "2",
    title: "Worth Every Penny",
    clientName: "Jessica L.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "The photos are absolutely stunning and timeless. Highly recommend!",
  },
  {
    id: "3",
    title: "Best Investment in Myself",
    clientName: "Amanda K.",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Best investment I've made for myself. The entire team made me feel comfortable.",
  },
];

export function VideoTestimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

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
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {videoTestimonials.map((video) => (
          <motion.div key={video.id} variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedVideo(video)}
              className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={video.thumbnail}
                alt={video.clientName}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center"
                >
                  <Play className="w-6 h-6 text-primary-foreground fill-current" />
                </motion.div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white font-bold">{video.clientName}</p>
                <p className="text-white/80 text-sm">{video.title}</p>
              </div>
            </motion.button>

            {/* Quote */}
            <p className="mt-4 text-sm italic text-muted-foreground">"{video.quote}"</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="text-2xl font-bold">
            {selectedVideo?.title}
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </DialogClose>

          {selectedVideo && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <p className="font-semibold">{selectedVideo.clientName}</p>
                <p className="text-muted-foreground italic mt-2">"{selectedVideo.quote}"</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
