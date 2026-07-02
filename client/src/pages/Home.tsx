import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Star, Heart, Sparkles, Camera, Users, Gift, Mail, Phone, MapPin } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, easeOut, easeInOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { TrustBadges, UrgencyBanner, PricingTiers, ExperienceTimeline, ClientStory } from "@/components/PremiumFeatures";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { LeadMagnetModal } from "@/components/LeadMagnetModal";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { BookingCalendar } from "@/components/BookingCalendar";
import { ReferralProgram } from "@/components/ReferralProgram";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { BlogSection } from "@/components/BlogSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { PersonalizationQuiz } from "@/components/PersonalizationQuiz";

/**
 * Monarch Boudoir Landing Page
 * Luxury portrait photography experience website
 */

// Animation variants
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
    transition: { duration: 0.6, ease: easeOut },
  },
};

// Reusable section component with scroll animation
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hero Section
function HeroSection() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=1200&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 flex flex-col items-center justify-center text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
          className="space-y-6 max-w-4xl"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, ease: easeOut }}
            className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase"
          >
            ✨ The Luxury Portrait Experience
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: easeOut }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight"
          >
            Monarch Boudoir
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Celebrate your elegance, confidence, and beauty through luxury portrait photography
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
            className="pt-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Your Session
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: easeInOut }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl md:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop"
              alt="Boudoir Photography"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={containerVariants} className="space-y-6 md:col-span-2">
            <motion.div variants={itemVariants}>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase">About Us</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
                Your Story, Beautifully Told
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              At Monarch Boudoir, we believe every woman deserves to feel empowered, confident, and absolutely radiant. Our luxury portrait experience celebrates your unique beauty through carefully curated sessions designed to create timeless, artistic images.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              With over a decade of experience in luxury photography, our team creates an intimate, comfortable environment where you can truly be yourself. From styling to final retouching, every detail is crafted with precision and care.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// What's Included Section
function WhatsIncludedSection() {
  const packages = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "Full session with professional lighting, posing guidance, and artistic direction",
    },
    {
      icon: Users,
      title: "Styling Consultation",
      description: "Expert guidance on wardrobe, makeup, and styling to enhance your natural beauty",
    },
    {
      icon: Gift,
      title: "Premium Retouching",
      description: "Artistic retouching and color grading to create timeless, gallery-quality images",
    },
    {
      icon: Sparkles,
      title: "Digital Gallery",
      description: "Access to your complete digital gallery with high-resolution, print-ready files",
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 bg-accent/5">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={itemVariants} className="text-primary font-semibold text-sm tracking-widest uppercase">
            Experience
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
            What's Included
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our comprehensive experience includes everything you need for an unforgettable session
          </motion.p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 group">
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pkg.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Bride-to-Be",
      text: "The Monarch Boudoir experience was absolutely transformative. I felt so confident and beautiful throughout the entire session. The final images are beyond my expectations!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Jessica Chen",
      role: "Entrepreneur",
      text: "I wanted to celebrate my journey and confidence. The team made me feel so comfortable and empowered. These images are now my favorite possession.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Amanda Rodriguez",
      role: "Artist",
      text: "Monarch Boudoir captured my essence perfectly. The artistry and attention to detail in every image is remarkable. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  return (
    <section id="testimonials" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={itemVariants} className="text-primary font-semibold text-sm tracking-widest uppercase">
            Testimonials
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
            What Our Clients Say
          </motion.h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {/* Carousel */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-8"
          >
            <Card className="p-8 border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic text-lg">{testimonials[currentIndex].text}</p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Portfolio Gallery Section
function PortfolioSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="portfolio" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Our Work
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Portfolio Showcase
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our diverse collection of luxury portrait photography across different styles and occasions
          </motion.p>
        </AnimatedSection>

        <PortfolioGallery />
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "What should I wear to my session?",
      answer: "We recommend bringing multiple outfit options including lingerie, robes, and pieces that make you feel confident. Our styling consultation will help you choose the perfect looks for your session.",
    },
    {
      question: "How long is a typical session?",
      answer: "Our standard session is 2-3 hours, which includes styling, hair/makeup touch-ups, and plenty of time for different looks and poses. We want to ensure you feel relaxed and have amazing variety.",
    },
    {
      question: "When will I receive my photos?",
      answer: "You'll receive your edited digital gallery within 2-3 weeks of your session. All images are professionally retouched and delivered in high-resolution, print-ready format.",
    },
    {
      question: "Is the experience private and confidential?",
      answer: "Absolutely. Your privacy and comfort are our top priorities. All sessions are completely confidential, and you have full control over how your images are shared.",
    },
    {
      question: "Do you offer group sessions?",
      answer: "Yes! We offer special group experiences for brides, friends, or special occasions. Contact us to discuss custom packages for your group.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require 48 hours notice for cancellations. Cancellations made within 48 hours will forfeit the session fee. Rescheduling is always welcome!",
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" ref={ref} className="py-20 md:py-32 bg-accent/5">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={itemVariants} className="text-primary font-semibold text-sm tracking-widest uppercase">
            Questions
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
            Frequently Asked Questions
          </motion.h2>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <AccordionItem value={`item-${idx}`} className="border-primary/20 hover:border-primary/40 transition-colors">
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// Booking Form Section
function BookingFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookingMutation = trpc.bookings.submit.useMutation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await bookingMutation.mutateAsync(formData);
      toast.success(result.message);
      setFormData({ name: "", email: "", phone: "", preferredDate: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="max-w-2xl mx-auto">
          <motion.div variants={containerVariants} className="text-center mb-12">
            <motion.p variants={itemVariants} className="text-primary font-semibold text-sm tracking-widest uppercase">
              Book Now
            </motion.p>
            <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
              Schedule Your Consultation
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-4">
              Let's create something beautiful together
            </motion.p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-8 rounded-2xl border border-primary/10 shadow-lg"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-foreground font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-2 border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="mt-2 border-primary/20 focus:border-primary"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-foreground font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="mt-2 border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="preferredDate" className="text-foreground font-semibold">
                  Preferred Session Date
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  className="mt-2 border-primary/20 focus:border-primary"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="message" className="text-foreground font-semibold">
                Tell Us About Your Vision
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your ideas, preferences, or any special requests..."
                rows={5}
                className="mt-2 border-primary/20 focus:border-primary resize-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
            </motion.div>
          </motion.form>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer Section
function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Monarch Boudoir</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Luxury portrait photography celebrating elegance, confidence, and beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#about" className="hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-background transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-background transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-background transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@monarchboudoir.com" className="hover:text-background transition-colors">
                  info@monarchboudoir.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Instagram
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Facebook
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p>&copy; 2026 Monarch Boudoir. All rights reserved. | Designed with elegance and care.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TrustBadgesSection />
      <UrgencySection />
      <AboutSection />
      <PortfolioSection />
      <PricingSection />
      <BeforeAfterSection />
      <ExperienceSection />
      <ClientStoriesSection />
      <WhatsIncludedSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <BlogSectionPage />
      <InstagramSectionPage />
      <PersonalizationQuizSection />
      <ReferralSection />
      <FAQSection />
      <BookingFormSection />
      <BookingCalendarSection />
      <Footer />
      <LeadMagnetModal />
      <LiveChatWidget />
    </div>
  );
}

// Personalization Quiz Section
function PersonalizationQuizSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="quiz" ref={ref} className="py-20 md:py-32 bg-accent/3">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Find Your Perfect Package
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Your Perfect Session
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Answer a few quick questions to get personalized package recommendations
          </motion.p>
        </AnimatedSection>

        <PersonalizationQuiz />
      </div>
    </section>
  );
}
// Video Testimonials Section
function VideoTestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="video-testimonials" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Video Testimonials
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Hear From Our Clients
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Watch real clients share their transformation stories
          </motion.p>
        </AnimatedSection>

        <VideoTestimonials />
      </div>
    </section>
  );
}

// Blog Section
function BlogSectionPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" ref={ref} className="py-20 md:py-32 bg-accent/3">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Blog & Resources
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Expert Tips & Insights
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Learn everything you need to know about boudoir photography
          </motion.p>
        </AnimatedSection>

        <BlogSection />
      </div>
    </section>
  );
}

// Instagram Section
function InstagramSectionPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="instagram" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Follow Us
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            @MonarchBoudoir
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join our community and see daily inspiration
          </motion.p>
        </AnimatedSection>

        <InstagramFeed />
      </div>
    </section>
  );
}
// Trust Badges Section
function TrustBadgesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="py-8 md:py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border"
    >
      <div className="container">
        <TrustBadges />
      </div>
    </motion.section>
  );
}

// Urgency Section
function UrgencySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="py-8 md:py-12 bg-background"
    >
      <div className="container">
        <UrgencyBanner />
      </div>
    </motion.section>
  );
}

// Pricing Section
function PricingSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-32 bg-accent/3">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Packages
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Choose Your Perfect Package
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Flexible options tailored to your needs and budget
          </motion.p>
        </AnimatedSection>

        <PricingTiers />
      </div>
    </section>
  );
}

// Before/After Section
function BeforeAfterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="before-after" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Transformations
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            See the Magic
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Witness the confidence transformation our clients experience
          </motion.p>
        </AnimatedSection>

        <BeforeAfterGallery />
      </div>
    </section>
  );
}

// Experience Timeline Section
function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 bg-accent/3">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Your Journey
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            What to Expect
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A step-by-step guide to your empowering experience
          </motion.p>
        </AnimatedSection>

        <ExperienceTimeline />
      </div>
    </section>
  );
}

// Client Stories Section
function ClientStoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="stories" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Success Stories
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Client Spotlights
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real stories from real clients who transformed their confidence
          </motion.p>
        </AnimatedSection>

        <ClientStory />
      </div>
    </section>
  );
}

// Referral Section
function ReferralSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="referral" ref={ref} className="py-20 md:py-32 bg-accent/3">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Earn Rewards
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Referral Program
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Share the love and earn credits for every friend you refer
          </motion.p>
        </AnimatedSection>

        <ReferralProgram />
      </div>
    </section>
  );
}

// Booking Calendar Section
function BookingCalendarSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="calendar" ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-primary font-semibold text-sm tracking-widest uppercase"
          >
            Schedule
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
          >
            Pick Your Perfect Date
          </motion.h2>
        </AnimatedSection>

        <BookingCalendar />
      </div>
    </section>
  );
}
