"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, Sparkles, Zap, Shield, Rocket, ChevronRight, 
  ArrowRight, CheckCircle2, MessageSquare, Briefcase, FileText
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ============================================
   MARKETING LANDING PAGE
============================================ */

export default function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#060608]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white text-base font-black">C</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Creator<span className="text-indigo-400">OS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none overflow-hidden -z-10">
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.1, 0.2, 0.1],
                 x: [-20, 20, -20]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[120px]"
            />
            <motion.div 
               animate={{ 
                 scale: [1, 1.1, 1],
                 opacity: [0.05, 0.1, 0.05],
                 x: [30, -30, 30]
               }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500 blur-[100px]"
            />
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-8 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md"
            >
              <Sparkles size={12} />
              <span>Platform re-imagined for 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05]"
            >
              The all-in-one <br />
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Creator System.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Build websites, design graphics, manage invoices, and scale your business — 
              all powered by a smart AI layer that never sleeps.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link href="/signup">
                <Button variant="gradient" size="lg" className="h-14 px-10 text-base" rightIcon={<ArrowRight size={18} />}>
                  Build Your Empire
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-14 px-10 text-base border-white/10 hover:bg-white/5">
                  See the Demo
                </Button>
              </Link>
            </motion.div>

            {/* Product Demo Showcase */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24 relative"
            >
              <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative group perspective-1000">
                <motion.div 
                  whileHover={{ rotateX: 2, rotateY: -1, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="rounded-[32px] border border-white/10 bg-[#0c0c10] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                >
                  <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-medium text-gray-500 tracking-wider">CREATOR_BUILDER_V2.ASH</div>
                    <div className="w-10" />
                  </div>

                  <div className="aspect-[16/9] flex bg-[#060608]">
                    {/* Sidebar Mockup */}
                    <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
                      ))}
                    </div>
                    {/* Canvas Mockup */}
                    <div className="flex-1 p-8 overflow-hidden">
                      <div className="grid grid-cols-12 gap-6 h-full">
                        <div className="col-span-8 flex flex-col gap-6">
                          <div className="h-32 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-600/20 border border-indigo-500/20 flex items-center justify-center">
                             <div className="w-32 h-2 bg-white/20 rounded-full" />
                          </div>
                          <div className="grid grid-cols-2 gap-6 flex-1">
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02]" />
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02]" />
                          </div>
                        </div>
                        <div className="col-span-4 rounded-2xl border border-white/5 bg-white/5 p-6 space-y-4">
                           <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                           <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10" />
                           <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10" />
                           <div className="h-24 w-full bg-white/5 rounded-lg border border-white/10" />
                           <div className="h-10 w-full bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements for "Demo" feel */}
                <motion.div 
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-12 -right-8 p-4 rounded-2xl border border-white/10 bg-[#0c0c10]/80 backdrop-blur-xl shadow-2xl hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Rocket size={20} />
                    </div>
                    <div className="pr-4">
                      <p className="text-[10px] font-bold text-gray-500 uppercase">Status</p>
                      <p className="text-sm font-bold text-white">Project Deployed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 15, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-8 -left-12 p-4 rounded-2xl border border-white/10 bg-[#0c0c10]/80 backdrop-blur-xl shadow-2xl hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Zap size={20} />
                    </div>
                    <div className="pr-4">
                      <p className="text-[10px] font-bold text-gray-500 uppercase">Live Preview</p>
                      <p className="text-sm font-bold text-white">99% Faster Load</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Tools Grid ── */}
        <section id="tools" className="py-24 px-6 bg-[#0c0c10]/50">
           <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black">Everything you need.</h2>
                 <p className="text-gray-400">14 powerful tools, one single subscription.</p>
              </div>
              
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { icon: <Globe size={24} />, title: "Website Builder", desc: "Next-gen drag and drop with instant publishing.", color: "from-blue-500 to-indigo-600", delay: 0.1 },
                   { icon: <Zap size={24} />, title: "Design Suite", desc: "Create graphics, logos, and brand kits in seconds.", color: "from-indigo-500 to-purple-600", delay: 0.2 },
                   { icon: <FileText size={24} />, title: "Business Hub", desc: "Invoicing, proposals, and automated contracts.", color: "from-emerald-500 to-teal-600", delay: 0.3 }
                 ].map((tool, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: tool.delay }}
                   >
                     <ToolCard {...tool} />
                   </motion.div>
                 ))}
               </div>
           </div>
        </section>
        {/* ── Journey Section (Demo) ── */}
        <section className="py-24 px-6 overflow-hidden">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 space-y-8">
                 <motion.div 
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-4"
                 >
                    <h2 className="text-4xl md:text-6xl font-black leading-tight">Create faster <br/> than you think.</h2>
                    <p className="text-gray-400 text-lg">A simple three-step process to take you from idea to global presence in under 5 minutes.</p>
                 </motion.div>

                 <div className="space-y-6">
                    {[
                      { step: "01", title: "Choose a Template", desc: "Select from 100+ high-converting SaaS and Portfolio designs." },
                      { step: "02", title: "Edit Visually", desc: "The fastest builder on the web. No code, just pure creativity." },
                      { step: "03", title: "Launch & Scale", desc: "Push live in 1-click and use our built-in business hub to grow." }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                      >
                         <span className="text-2xl font-black text-indigo-500/50">{item.step}</span>
                         <div>
                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>

              {/* Animated Journey Visual */}
              <div className="flex-1 relative">
                 <motion.div 
                    initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 aspect-square rounded-[40px] bg-gradient-to-tr from-indigo-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center"
                 >
                    <div className="absolute inset-0 bg-indigo-500/10 blur-[100px]" />
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="w-64 h-64 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center"
                    >
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-2xl">
                          <CheckCircle2 size={24} />
                       </div>
                    </motion.div>
                    {/* Floating checkmarks */}
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={16} />
                    </motion.div>
                    <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-1/3 right-1/4 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Rocket size={18} />
                    </motion.div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* ── Pricing Section ── */}
        <section id="pricing" className="py-24 px-6 bg-[#0c0c10]/50 relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
           <div className="max-w-7xl mx-auto space-y-16 relative">
              <div className="text-center space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black">Simple, transparent pricing.</h2>
                 <p className="text-gray-400 max-w-md mx-auto">Pick the plan that fits your growth stage. No hidden fees.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    price: "5",
                    desc: "For curious creators.",
                    features: ["1 Published Project", "Basic Builder Library", "Community Support", "1GB Asset Storage"],
                    color: "from-blue-400 to-indigo-500",
                    cta: "Start Free Trial"
                  },
                  {
                    name: "Pro",
                    price: "15",
                    desc: "The sweet spot.",
                    features: ["10 Published Projects", "Full AI Tools", "Auto-Deploy to GitHub/Vercel", "Priority Support", "10GB Storage"],
                    color: "from-indigo-500 to-violet-600",
                    cta: "Get Pro Access",
                    popular: true
                  },
                  {
                    name: "Elite",
                    price: "30",
                    desc: "Scale your empire.",
                    features: ["Unlimited Projects", "White-label Hosting", "Custom Domain Support", "1-on-1 Strategy Call", "Unlimited Storage"],
                    color: "from-violet-600 to-fuchsia-600",
                    cta: "Join Elite"
                  }
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-8 rounded-[32px] border flex flex-col",
                      plan.popular ? "bg-white/[0.04] border-indigo-500/40 shadow-2xl relative" : "bg-white/[0.02] border-white/5"
                    )}
                  >
                    {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-[10px] font-bold uppercase tracking-widest">Most Popular</div>}
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mb-8">{plan.desc}</p>
                    <div className="flex items-baseline gap-1 mb-8">
                       <span className="text-4xl font-black">${plan.price}</span>
                       <span className="text-gray-500">/mo</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                       {plan.features.map((f, j) => (
                         <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                           <CheckCircle2 size={16} className="text-indigo-400" /> {f}
                         </li>
                       ))}
                    </ul>
                    <Link href="/signup">
                      <Button variant={plan.popular ? "gradient" : "outline"} className="w-full h-12 text-sm font-bold border-white/10">{plan.cta}</Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 px-6">
           <div className="max-w-3xl mx-auto space-y-12 text-center">
              <h2 className="text-3xl md:text-5xl font-black">Common questions.</h2>
              <div className="text-left space-y-6">
                 {[
                   { q: "Can I cancel my subscription any time?", a: "Yes, you can cancel at any moment from your dashboard billing settings. No questions asked." },
                   { q: "How does the GitHub & Vercel deployment work?", a: "We automatically create a private repository for you, push the code, and trigger a production build on our enterprise Vercel infrastructure." },
                   { q: "Do I need to know how to code?", a: "Not at all. Our visual builder handles everything, but you can inject custom HTML/CSS if you're a power user." }
                 ].map((item, i) => (
                   <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                      <h4 className="font-bold text-white tracking-tight">{item.q}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
        </main>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
         <p>© 2026 CreatorOS. Build something extraordinary.</p>
      </footer>
    </div>
  );
}

function ToolCard({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
  return (
    <div className="group p-8 rounded-[24px] border border-white/5 bg-[#0c0c10] hover:border-indigo-500/30 transition-all duration-300">
      <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
