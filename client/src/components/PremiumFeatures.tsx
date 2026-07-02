import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Shield, Clock, Award, Heart } from "lucide-react";

// Trust Badges Component
export function TrustBadges() {
  const badges = [
    { icon: Shield, label: "Secure Booking", description: "SSL Encrypted" },
    { icon: Award, label: "Certified Photographer", description: "10+ Years Experience" },
    { icon: Clock, label: "Quick Response", description: "<2 Hours" },
    { icon: Heart, label: "500+ Happy Clients", description: "Trusted & Verified" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20"
          >
            <Icon className="w-4 h-4 text-primary" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Urgency Elements Component
export function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 md:p-6 text-center"
    >
      <p className="text-sm md:text-base font-semibold text-primary mb-2">
        ⏰ Limited Availability
      </p>
      <p className="text-foreground font-bold">
        Only <span className="text-primary text-lg">2 slots</span> left for this month
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Booked 3 times this week • Average response time: 1.5 hours
      </p>
    </motion.div>
  );
}

// Pricing Tiers Component
export function PricingTiers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const tiers = [
    {
      name: "Starter",
      price: "$299",
      duration: "1.5 hours",
      description: "Perfect for first-timers",
      features: [
        "Professional styling & makeup",
        "1.5-hour session",
        "50+ edited photos",
        "Digital gallery access",
        "Print release included",
      ],
      popular: false,
    },
    {
      name: "Signature",
      price: "$499",
      duration: "2.5 hours",
      description: "Most popular choice",
      features: [
        "Premium styling & makeup",
        "2.5-hour session",
        "100+ edited photos",
        "Multiple outfit changes",
        "Private online gallery",
        "Print release included",
        "Complimentary prints",
      ],
      popular: true,
    },
    {
      name: "Luxury",
      price: "$799",
      duration: "4 hours",
      description: "The ultimate experience",
      features: [
        "Luxury styling & makeup",
        "4-hour session",
        "150+ edited photos",
        "Unlimited outfit changes",
        "Private online gallery",
        "Premium album included",
        "Print release included",
        "Complimentary prints",
        "Personal photoshoot coach",
      ],
      popular: false,
    },
  ];

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
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {tiers.map((tier, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <Card
            className={`relative overflow-hidden h-full flex flex-col ${
              tier.popular ? "ring-2 ring-primary shadow-xl" : ""
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
            )}

            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>

              <div className="mb-6">
                <p className="text-4xl font-bold text-primary">{tier.price}</p>
                <p className="text-sm text-muted-foreground">{tier.duration}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                Book {tier.name}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Experience Timeline Component
export function ExperienceTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const stages = [
    {
      number: "01",
      title: "Pre-Session Consultation",
      description: "We discuss your vision, style preferences, and any concerns to ensure you feel completely comfortable.",
      duration: "15 min",
    },
    {
      number: "02",
      title: "Styling & Makeup",
      description: "Professional styling and makeup application to enhance your natural beauty and boost confidence.",
      duration: "30-45 min",
    },
    {
      number: "03",
      title: "The Photoshoot",
      description: "Guided through poses with encouragement and direction. We focus on making you feel beautiful and empowered.",
      duration: "1-2 hours",
    },
    {
      number: "04",
      title: "Gallery Delivery",
      description: "All photos professionally edited and delivered in a private online gallery within 2-3 weeks.",
      duration: "2-3 weeks",
    },
    {
      number: "05",
      title: "Prints & Products",
      description: "Order prints, albums, or other products from your gallery. We handle everything for you.",
      duration: "Ongoing",
    },
  ];

  return (
    <div ref={ref} className="space-y-8">
      {stages.map((stage, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: idx * 0.1 }}
          className="flex gap-6"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {stage.number}
            </div>
            {idx < stages.length - 1 && (
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 mt-2" />
            )}
          </div>

          <div className="pb-8 flex-1">
            <h4 className="text-xl font-bold mb-2">{stage.title}</h4>
            <p className="text-muted-foreground mb-2">{stage.description}</p>
            <p className="text-sm font-semibold text-primary">{stage.duration}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Client Success Story Component
export function ClientStory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const stories = [
    {
      name: "Sarah M.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      quote: "This experience completely changed how I see myself. I felt so empowered and supported throughout the entire session.",
      achievement: "Celebrated her 30th birthday with confidence",
    },
    {
      name: "Jessica L.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      quote: "The photos are absolutely stunning and timeless. I can't believe how beautiful I look. Highly recommend!",
      achievement: "Reignited her self-love journey",
    },
    {
      name: "Amanda K.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      quote: "Best investment I've made for myself. The entire team made me feel comfortable and beautiful.",
      achievement: "Strengthened her relationship with confidence",
    },
  ];

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
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {stories.map((story, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={story.image}
                alt={story.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{story.name}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-foreground font-semibold mb-4 italic">"{story.quote}"</p>

            <Badge className="bg-primary/10 text-primary border-primary/20">
              {story.achievement}
            </Badge>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
