"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Bot,
  Sparkles,
  Copy,
  RefreshCw,
  ChevronDown,
  FileText,
  Globe,
  User,
  MessageSquare,
  Zap,
  Check,
} from "lucide-react";

/* ============================================
   CONTENT TYPES
============================================ */
interface ContentType {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  fields: Field[];
  promptBuilder: (values: Record<string, string>) => string;
}

interface Field {
  id: string;
  label: string;
  placeholder: string;
  type: "input" | "textarea";
}

const contentTypes: ContentType[] = [
  {
    id: "headline",
    label: "Landing Page Headline",
    description: "High-converting headlines for your page",
    icon: Globe,
    fields: [
      { id: "product", label: "Product/Service", placeholder: "e.g. Freelance design studio", type: "input" },
      { id: "audience", label: "Target Audience", placeholder: "e.g. startups needing a brand identity", type: "input" },
    ],
    promptBuilder: (v) =>
      `Write 5 powerful, conversion-focused headline variations for a landing page about "${v.product}" targeting "${v.audience}". Be bold, punchy, and under 10 words each. Return one per line.`,
  },
  {
    id: "bio",
    label: "Professional Bio",
    description: "Personal bios for portfolios and profiles",
    icon: User,
    fields: [
      { id: "name", label: "Your Name", placeholder: "e.g. Sarah Chen", type: "input" },
      { id: "role", label: "Your Role", placeholder: "e.g. Brand Designer & Illustrator", type: "input" },
      { id: "speciality", label: "What You Do", placeholder: "e.g. I help startups find their visual identity", type: "input" },
    ],
    promptBuilder: (v) =>
      `Write 3 professional bio variations for ${v.name}, a ${v.role}. Their specialty: ${v.speciality}. Each bio should be 2-3 sentences. Be human, confident, and specific. Avoid clichés.`,
  },
  {
    id: "social",
    label: "Social Media Post",
    description: "Engaging posts for any platform",
    icon: MessageSquare,
    fields: [
      { id: "topic", label: "Topic / Idea", placeholder: "e.g. Launched my new portfolio site", type: "input" },
      { id: "platform", label: "Platform", placeholder: "e.g. LinkedIn, Twitter, Instagram", type: "input" },
      { id: "tone", label: "Tone", placeholder: "e.g. excited, professional, casual", type: "input" },
    ],
    promptBuilder: (v) =>
      `Write 3 engaging ${v.platform} post variations about: "${v.topic}". Tone: ${v.tone}. Include relevant emojis naturally. Optimize for ${v.platform}'s format and character limits.`,
  },
  {
    id: "landing-page",
    label: "Full Landing Page Copy",
    description: "Complete copy for a landing page",
    icon: FileText,
    fields: [
      { id: "product", label: "Product Name", placeholder: "e.g. DesignFlow", type: "input" },
      { id: "audience", label: "Target Audience", placeholder: "e.g. freelance designers", type: "input" },
      { id: "benefit", label: "Core Benefit", placeholder: "e.g. Save 5 hours a week on client work", type: "input" },
    ],
    promptBuilder: (v) =>
      `Write complete landing page copy for "${v.product}" targeting ${v.audience}. Core benefit: ${v.benefit}.

Return as JSON with these exact keys:
- headline: (punchy, under 8 words)
- subheadline: (25 words, value-driven)  
- features: (array of 3 objects with "icon", "title", "description")
- cta: (call-to-action button text, 3-4 words)
- socialProof: (one testimonial quote with name and role)
- faq: (array of 3 question/answer objects)`,
  },
  {
    id: "invoice-desc",
    label: "Invoice Line Item",
    description: "Professional service descriptions",
    icon: Zap,
    fields: [
      { id: "service", label: "Service Performed", placeholder: "e.g. Logo redesign for Nike campaign", type: "input" },
      { id: "deliverables", label: "Deliverables", placeholder: "e.g. 3 logo concepts, final files in AI/SVG/PNG", type: "input" },
    ],
    promptBuilder: (v) =>
      `Write a professional, clear invoice line item description for: "${v.service}". Deliverables: ${v.deliverables}. Max 2 sentences. Formal but friendly tone.`,
  },
];

/* ============================================
   AI WRITER PAGE
============================================ */
export default function AIWriterPage() {
  const [selectedType, setSelectedType] = useState<ContentType>(contentTypes[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    const prompt = selectedType.promptBuilder(fieldValues);
    setLoading(true);
    setOutput("");
    setActiveProvider(null);

    try {
      // Try providers in order via the AI router
      const providers = ["gemini", "claude", "openai"];
      let success = false;

      for (const provider of providers) {
        try {
          setActiveProvider(provider);
          const res = await fetch(`/api/ai/${provider}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [{ role: "user", content: prompt }],
              temperature: 0.8,
              maxTokens: 1024,
            }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setOutput(data.text);
          success = true;
          break;
        } catch {
          // Try next provider
          continue;
        }
      }

      if (!success) {
        setOutput("⚠️ All AI providers are currently unavailable. Please add API keys to your .env.local file.");
        setActiveProvider(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormFilled = selectedType.fields.every((f) => fieldValues[f.id]?.trim());

  return (
    <DashboardShell title="AI Content Writer">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">AI Content Writer</h1>
            <p className="text-sm text-[var(--clr-text-secondary)]">
              Auto-switches between Gemini → Claude → GPT-4o for zero downtime
            </p>
          </div>
          {activeProvider && (
            <Badge variant="primary" className="ml-auto">
              Using: {activeProvider}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr] gap-6">
          {/* ── Config Panel ── */}
          <div className="space-y-4">
            {/* Content Type Picker */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-2">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider mb-3">
                Content Type
              </p>
              {contentTypes.map((ct) => {
                const Icon = ct.icon;
                const active = ct.id === selectedType.id;
                return (
                  <button
                    key={ct.id}
                    onClick={() => {
                      setSelectedType(ct);
                      setFieldValues({});
                      setOutput("");
                    }}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-[10px]",
                      "transition-all duration-150 border",
                      active
                        ? "border-[var(--clr-secondary)] bg-[var(--clr-secondary)]/10 text-[var(--clr-text-primary)]"
                        : "border-transparent hover:bg-[var(--clr-surface-2)] text-[var(--clr-text-secondary)]"
                    )}
                  >
                    <Icon size={15} className={active ? "text-[var(--clr-secondary)]" : "text-[var(--clr-text-muted)]"} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ct.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Input Fields */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">
                {selectedType.label}
              </p>
              {selectedType.fields.map((field) =>
                field.type === "textarea" ? (
                  <Textarea
                    key={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={fieldValues[field.id] ?? ""}
                    onChange={(e) =>
                      setFieldValues((v) => ({ ...v, [field.id]: e.target.value }))
                    }
                  />
                ) : (
                  <Input
                    key={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={fieldValues[field.id] ?? ""}
                    onChange={(e) =>
                      setFieldValues((v) => ({ ...v, [field.id]: e.target.value }))
                    }
                  />
                )
              )}

              <Button
                variant="gradient"
                className="w-full"
                size="md"
                leftIcon={<Sparkles size={15} />}
                onClick={handleGenerate}
                loading={loading}
                disabled={!isFormFilled}
              >
                {loading ? "Generating…" : "Generate with AI"}
              </Button>
            </div>
          </div>

          {/* ── Output Panel ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] flex flex-col min-h-[500px]">
            {/* Output header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--clr-border)]">
              <p className="text-sm font-semibold text-[var(--clr-text-primary)]">Output</p>
              <div className="flex items-center gap-2">
                {output && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<RefreshCw size={12} />}
                      onClick={handleGenerate}
                      loading={loading}
                    >
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={copied ? <Check size={12} /> : <Copy size={12} />}
                      onClick={handleCopy}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Output content */}
            <div ref={outputRef} className="flex-1 p-5 overflow-y-auto">
              {loading ? (
                <div className="space-y-3">
                  {/* Streaming skeleton */}
                  {[80, 60, 90, 50, 70].map((w, i) => (
                    <div
                      key={i}
                      className="skeleton h-4 rounded"
                      style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--clr-secondary)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[var(--clr-secondary)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[var(--clr-secondary)] animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="text-xs text-[var(--clr-text-muted)] ml-1">
                      {activeProvider ? `Generating with ${activeProvider}…` : "Connecting…"}
                    </span>
                  </div>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap text-sm text-[var(--clr-text-primary)] leading-relaxed font-[var(--font-sans)] prose-creatorios">
                  {output}
                </pre>
              ) : (
                /* Empty state */
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-12">
                  <div className="w-16 h-16 rounded-[20px] gradient-bg-subtle flex items-center justify-center">
                    <Sparkles size={28} className="text-[var(--clr-secondary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--clr-text-primary)] mb-1">
                      Ready to write
                    </p>
                    <p className="text-sm text-[var(--clr-text-secondary)] max-w-xs">
                      Fill in the fields on the left and click Generate. AI will auto-switch providers if one fails.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
