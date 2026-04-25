"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Sparkles, 
  Zap, 
  Code, 
  Layers, 
  Smartphone, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const DOCS = [
  {
    title: "1. The Website Builder",
    icon: Globe,
    color: "text-blue-400",
    content: "The heart of CreatorOS. Use the drag-and-drop canvas to build high-converting landing pages. You can reorder sections, edit text in-place, and customize every pixel.",
    tip: "Tip: Use the 'Auto-Deploy' button to push your site live to GitHub and Vercel instantly."
  },
  {
    title: "2. Figma Layout Tools",
    icon: Layers,
    color: "text-indigo-400",
    content: "We've built Figma-inspired tools right into the sidebar. Use the 'Layers' tab to manage block hierarchy, and toggle 'Grids' for perfect alignment.",
    tip: "Tip: Press the 'Align Center' button in the styles panel to perfectly center any section content."
  },
  {
    title: "3. Pro Code Editor",
    icon: Code,
    color: "text-emerald-400",
    content: "For power users who want total control. Our dedicated code editor features IntelliSense—VS Code-like suggestions for HTML, CSS, and Tailwind classes.",
    tip: "Tip: Type '<' inside the editor to see a list of suggested HTML tags."
  },
  {
    title: "4. Responsive Design",
    icon: Smartphone,
    color: "text-amber-400",
    content: "Your sites must look great everywhere. Use the 'Breakpoint Switcher' at the top of the builder to edit styles specifically for mobile and tablet views.",
    tip: "Tip: Always check your site in 'Mobile View' before hitting the Auto-Deploy button."
  }
];

export default function ManualPage() {
  return (
    <DashboardShell title="Platform Manual">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        {/* Hero Section */}
        <div className="relative p-10 rounded-[32px] bg-[#1A1A23] border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">
              <Cpu size={12} /> Powered by Antigravity AI
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Master the art of <br />
              <span className="text-indigo-400">Creation.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Welcome to the CreatorOS official guide. I am **Antigravity**, your AI architectural assistant.
              I'm here to help you navigate our tools and build websites that win.
            </p>
          </div>
        </div>

        {/* Documentation Items */}
        <div className="grid grid-cols-1 gap-8">
          {DOCS.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[24px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${doc.color}`}>
                    <Icon size={28} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{doc.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {doc.content}
                    </p>
                    
                    <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3">
                      <Sparkles size={16} className="text-indigo-400 shrink-0 mt-1" />
                      <p className="text-sm font-medium text-indigo-300 italic">{doc.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-6 pt-12">
          <h2 className="text-3xl font-bold">Ready to build your empire?</h2>
          <div className="flex items-center justify-center gap-4">
             <Button variant="gradient" size="lg" className="h-14 px-10">
                Go to Builder
             </Button>
             <Button variant="outline" size="lg" className="h-14 px-10 border-white/10 hover:bg-white/5">
                Check Code Editor
             </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
