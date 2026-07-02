import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Copy, Check, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function ReferralProgram() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);
  const referralCode = "MONARCH50";
  const referralLink = `https://monarchboudoir.com?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "You Get $50 Credit",
      description: "For each friend who books a session",
    },
    {
      icon: Users,
      title: "They Get $50 Off",
      description: "Your friend receives $50 off their first session",
    },
    {
      icon: Gift,
      title: "Unlimited Referrals",
      description: "Earn credits for every friend you refer",
    },
  ];

  const topReferrers = [
    { name: "Sarah M.", referrals: 12, credits: "$600" },
    { name: "Jessica L.", referrals: 8, credits: "$400" },
    { name: "Amanda K.", referrals: 6, credits: "$300" },
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
      className="space-y-12"
    >
      {/* How It Works */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Share Section */}
      <motion.div variants={itemVariants} className="bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h3 className="text-xl font-bold mb-4">Share Your Referral Link</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white border border-border rounded-lg px-4 py-3 flex items-center justify-between">
            <code className="text-sm text-muted-foreground truncate">{referralLink}</code>
          </div>
          <Button
            onClick={handleCopyLink}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold mb-8 text-center">Top Referrers</h3>
        <div className="space-y-4">
          {topReferrers.map((referrer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  #{idx + 1}
                </div>
                <div>
                  <p className="font-semibold">{referrer.name}</p>
                  <p className="text-sm text-muted-foreground">{referrer.referrals} referrals</p>
                </div>
              </div>
              <p className="font-bold text-primary text-lg">{referrer.credits}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg">
          Start Earning Credits Today
        </Button>
      </motion.div>
    </motion.div>
  );
}
