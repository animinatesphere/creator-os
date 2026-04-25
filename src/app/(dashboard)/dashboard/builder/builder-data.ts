import {
  Layout, Star, MessageSquare, CreditCard, Mail, Type,
  Image as ImageIcon, Settings, Rows,
} from "lucide-react";
import type { BlockDefinition, BlockData, PageData } from "./builder-types";

export const BLOCK_LIBRARY: BlockDefinition[] = [
  {
    type: "navbar",
    label: "Navigation",
    icon: Rows,
    category: "layout",
    defaultProps: {
      logo: "CreatorOS",
      links: JSON.stringify([
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: "#about" },
      ]),
      ctaText: "Get Started",
      sticky: "true",
    },
  },
  {
    type: "hero",
    label: "Hero",
    icon: Layout,
    category: "layout",
    defaultProps: {
      headline: "The Future of Digital Creation",
      subheadline: "Build, launch, and scale your digital products with our all-in-one operating system.",
      ctaText: "Get Started Free",
      ctaLink: "#",
      secondaryCta: "View Showcase",
      align: "center",
    },
  },
  {
    type: "features",
    label: "Features",
    icon: Star,
    category: "content",
    defaultProps: {
      title: "Powerful Infrastructure",
      subtitle: "Everything you need to run a modern digital business.",
      features: JSON.stringify([
        { icon: "⚡", title: "Lightning Fast", desc: "Edge-optimized delivery with sub-second performance." },
        { icon: "🎨", title: "Design System", desc: "Pre-built components that follow industry standards." },
        { icon: "🔒", title: "Bank-Grade", desc: "Enterprise security and encryption at every layer." },
      ]),
    },
  },
  {
    type: "testimonials",
    label: "Social Proof",
    icon: MessageSquare,
    category: "content",
    defaultProps: {
      title: "Trusted by Industry Leaders",
      testimonials: JSON.stringify([
        { quote: "CreatorOS transformed our workflow completely. The speed is unmatched.", name: "Alex Rivera", role: "CEO @ FlowState" },
        { quote: "The best builder I've ever used. It feels like magic.", name: "James Wilson", role: "Product Designer" },
        { quote: "Our conversion rates jumped 40% after switching to this platform.", name: "Elena Chen", role: "Marketing Director" },
      ]),
    },
  },
  {
    type: "pricing",
    label: "Pricing",
    icon: CreditCard,
    category: "content",
    defaultProps: {
      title: "Flexible Plans",
      subtitle: "Choose the scale that matches your growth.",
      plans: JSON.stringify([
        { name: "Starter", price: "$0", period: "/mo", features: ["3 projects", "Standard templates", "Basic analytics"], cta: "Start Free", highlighted: false },
        { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited projects", "Premium components", "Custom domains", "Priority support"], cta: "Start Pro Trial", highlighted: true },
        { name: "Scale", price: "$99", period: "/mo", features: ["Everything in Pro", "API access", "White-labeling", "Team collaboration"], cta: "Contact Sales", highlighted: false },
      ]),
    },
  },
  {
    type: "cta",
    label: "Call to Action",
    icon: Mail,
    category: "content",
    defaultProps: {
      headline: "Ready to launch?",
      subtext: "Join thousands of creators building the future.",
      ctaText: "Get Started Now",
      ctaLink: "#",
    },
  },
  {
    type: "text",
    label: "Typography",
    icon: Type,
    category: "content",
    defaultProps: {
      content: "Craft beautiful narratives with our advanced typography engine. Click here to edit this text.",
      align: "center",
      size: "lg",
    },
  },
  {
    type: "image",
    label: "Media",
    icon: ImageIcon,
    category: "media",
    defaultProps: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564",
      alt: "Abstract Design",
      width: "100%",
      caption: "Creative expression in the digital age",
    },
  },
];

export const TEMPLATES: Record<string, { id: string; type: any; props: any }[]> = {
  saas: [
    { id: "s1", type: "navbar", props: { logo: "Nova", links: JSON.stringify([{ label: "Product", href: "#" }, { label: "Pricing", href: "#" }]), ctaText: "Join Beta" } },
    { id: "s2", type: "hero", props: { headline: "Intelligent Workflows", subheadline: "Automate your business with AI-driven operations.", ctaText: "Start Free" } },
    { id: "s3", type: "features", props: { title: "Why Nova?", features: JSON.stringify([{ icon: "🤖", title: "AI Core", desc: "Smarter automation." }, { icon: "📈", title: "Analytics", desc: "Real-time insights." }]) } },
  ],
};

export const DEFAULT_PAGES: PageData[] = [
  { id: "home", name: "Home", blocks: [] },
  { id: "about", name: "About", blocks: [] },
  { id: "pricing", name: "Pricing", blocks: [] },
];
