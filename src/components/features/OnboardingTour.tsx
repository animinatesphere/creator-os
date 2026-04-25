"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  X, 
  Rocket, 
  Layers, 
  Code,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const TOUR_STEPS = [
  {
    title: "Welcome to CreatorOS!",
    desc: "I'm Antigravity, your AI guide. Let's take 30 seconds to show you how to build your empire.",
    icon: Sparkles,
    color: "bg-indigo-500",
  },
  {
    title: "The Website Builder",
    desc: "Our core drag-and-drop tool. Try the new 'Layers' tab and 'Mobile View' to build responsive sites fast.",
    icon: Layers,
    color: "bg-blue-500",
  },
  {
    title: "Pro Code Editor",
    icon: Code,
    desc: "Write raw HTML/CSS with built-in IntelliSense. It suggests code just like VS Code.",
    color: "bg-emerald-500",
  },
  {
    title: "Launch Everywhere",
    desc: "Hit 'Auto-Deploy' to push your site to GitHub and host it on Vercel with one click.",
    icon: Rocket,
    color: "bg-amber-500",
  }
];

export function OnboardingTour() {
  const { user, completeTour } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show tour for new users who haven't seen it
    if (user && !user.hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    completeTour();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm bg-[#1A1A23] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl"
      >
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}>
              <Icon size={24} />
            </div>
            <button 
              onClick={handleComplete}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              <MapPin size={10} /> Step {currentStep + 1} of {TOUR_STEPS.length}
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {step.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {TOUR_STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-indigo-500" : "w-2 bg-white/10"}`} 
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
             <Button 
               variant="gradient" 
               className="flex-1 h-12" 
               onClick={nextStep}
               rightIcon={currentStep === TOUR_STEPS.length - 1 ? <CheckCircle2 size={18} /> : <ChevronRight size={18} />}
             >
                {currentStep === TOUR_STEPS.length - 1 ? "Let's Build!" : "Next Tool"}
             </Button>
          </div>
          
          <Link href="/dashboard/manual" onClick={handleComplete}>
             <p className="text-center text-[10px] font-medium text-gray-500 hover:text-indigo-400 cursor-pointer transition-colors pt-2">
                Open my full manual for tips
             </p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
