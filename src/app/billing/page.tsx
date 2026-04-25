"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Zap, Rocket, Star, ArrowRight, ShieldCheck, Globe, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const PLANS = [
  {
    id: "Starter" as const,
    name: "Starter",
    price: "5",
    desc: "For hobbyists and explorers.",
    features: ["1 Published Project", "Basic Builder Library", "Community Support", "1GB Asset Storage"],
    color: "from-blue-400 to-indigo-500",
    icon: Star,
  },
  {
    id: "Pro" as const,
    name: "Pro",
    price: "15",
    desc: "The sweet spot for creators.",
    features: ["10 Published Projects", "Full AI Tools", "Custom Fonts & Style Engine", "Priority Support", "10GB Storage"],
    color: "from-indigo-500 to-violet-600",
    icon: Zap,
    popular: true,
  },
  {
    id: "Elite" as const,
    name: "Elite",
    price: "30",
    desc: "Scale your empire without limits.",
    features: ["Unlimited Projects", "White-label Hosting", "Custom Domain Support", "1-on-1 Strategy Call", "Unlimited Storage"],
    color: "from-violet-600 to-fuchsia-600",
    icon: Rocket,
  }
];

export default function BillingPage() {
  const router = useRouter();
  const { user, subscribe } = useAuthStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: "Starter" | "Pro" | "Elite") => {
    setLoading(planId);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    subscribe(planId);
    setLoading(null);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest"
          >
            <ShieldCheck size={14} /> Only one step left
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Choose your <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Power Level.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            You're seconds away from accessing your dashboard. Select the plan that fits your vision and start building.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={cn(
                "relative group flex flex-col p-8 rounded-[32px] border transition-all duration-500",
                plan.popular 
                  ? "bg-white/[0.04] border-indigo-500/40 shadow-[0_32px_80px_-20px_rgba(99,102,241,0.2)]" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-xs font-bold uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}

              <div className={cn(
                "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-lg",
                plan.color
              )}>
                <plan.icon size={24} className="text-white" />
              </div>

              <div className="space-y-1 mb-8">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.desc}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">${plan.price}</span>
                  <span className="text-gray-500 font-medium">/month</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Check size={12} className="text-indigo-400" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "gradient" : "outline"}
                size="lg"
                loading={loading === plan.id}
                onClick={() => handleSubscribe(plan.id)}
                className={cn(
                  "w-full h-14 text-base font-bold",
                  !plan.popular && "border-white/10 hover:bg-white/5"
                )}
                rightIcon={!loading && <CreditCard size={18} />}
              >
                {loading === plan.id ? "Processing..." : `Get Started`}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Confidence Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-12 text-gray-500 opacity-50"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe size={16} /> 256-bit SSL Security
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowRight size={16} /> No hidden fees
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star size={16} /> 14-day money back
          </div>
        </motion.div>
      </div>
    </div>
  );
}
