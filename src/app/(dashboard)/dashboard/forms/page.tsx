"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { 
  ClipboardList, Plus, Trash2, GripVertical, 
  Type, Mail, Phone, MessageSquare, Save, Eye,
  CheckCircle2, ChevronRight, Settings
} from "lucide-react";

/* ============================================
   FORM BUILDER
============================================ */

interface FormField {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  label: string;
  placeholder: string;
  required: boolean;
}

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function FormBuilderPage() {
  const [formName, setFormName] = useState("Contact Form");
  const [fields, setFields] = useState<FormField[]>([
    { id: uid(), type: "text", label: "Full Name", placeholder: "John Doe", required: true },
    { id: uid(), type: "email", label: "Email Address", placeholder: "john@example.com", required: true },
    { id: uid(), type: "textarea", label: "Message", placeholder: "How can we help?", required: false },
  ]);
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const addField = () => {
    setFields([...fields, { id: uid(), type: "text", label: "New Field", placeholder: "", required: false }]);
  };

  const updateField = (id: string, key: keyof FormField, val: any) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: val } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardShell title="Form Builder">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
              <ClipboardList size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">{formName}</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Create embeddable contact and lead capture forms</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={previewMode ? <Settings size={14} /> : <Eye size={14} />} onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? "Edit Form" : "Preview"}
            </Button>
            <Button variant="gradient" size="sm" leftIcon={<Save size={14} />} onClick={handleSave}>
              {saved ? "Saved ✓" : "Save Form"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
          {/* Editor / Preview Area */}
          <div className="space-y-4">
            {previewMode ? (
              <div className="rounded-[20px] border border-[var(--clr-border)] bg-white p-8 max-w-lg mx-auto shadow-sm">
                <h2 className="text-2xl font-black mb-6 text-gray-900">{formName}</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {fields.map(field => (
                    <div key={field.id} className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea 
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 focus:border-indigo-500 outline-none text-sm min-h-[100px]"
                        />
                      ) : (
                        <input 
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full h-11 px-4 rounded-[10px] border border-gray-200 focus:border-indigo-500 outline-none text-sm"
                        />
                      )}
                    </div>
                  ))}
                  <button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[12px] transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
                    Submit Form
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-[20px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 space-y-4">
                <Input label="Form Name" value={formName} onChange={(e) => setFormName(e.target.value)} />
                
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Form Fields</p>
                  {fields.map((field) => (
                    <div key={field.id} className="flex gap-3 p-4 rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-bg)] group transition-all hover:border-[var(--clr-secondary)]/50">
                      <div className="mt-2 text-[var(--clr-text-muted)] cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input 
                          placeholder="Label" 
                          value={field.label} 
                          onChange={(e) => updateField(field.id, "label", e.target.value)} 
                        />
                        <select 
                          value={field.type}
                          onChange={(e) => updateField(field.id, "type", e.target.value)}
                          className="h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface-2)] text-sm text-[var(--clr-text-primary)] outline-none"
                        >
                          <option value="text">Short Text</option>
                          <option value="email">Email Address</option>
                          <option value="tel">Phone Number</option>
                          <option value="textarea">Long Text</option>
                        </select>
                        <Input 
                          placeholder="Placeholder" 
                          value={field.placeholder} 
                          onChange={(e) => updateField(field.id, "placeholder", e.target.value)} 
                        />
                        <div className="flex items-center gap-2 px-3">
                           <input 
                             type="checkbox" 
                             checked={field.required} 
                             onChange={(e) => updateField(field.id, "required", e.target.checked)}
                             className="w-4 h-4 rounded accent-[var(--clr-secondary)]"
                           />
                           <span className="text-xs font-medium text-[var(--clr-text-secondary)]">Required field</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeField(field.id)}
                        className="h-10 w-10 flex items-center justify-center rounded-[10px] text-[var(--clr-text-muted)] hover:bg-red-500/10 hover:text-[var(--clr-danger)] transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-dashed" leftIcon={<Plus size={16} />} onClick={addField}>
                    Add New Field
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Form Settings</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--clr-text-secondary)]">Email notifications</span>
                  <div className="w-8 h-4 rounded-full bg-[var(--clr-secondary)] relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" /></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--clr-text-secondary)]">Spam protection (hCaptcha)</span>
                  <div className="w-8 h-4 rounded-full bg-[var(--clr-border)] relative cursor-pointer"><div className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-white" /></div>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[var(--clr-success)]">
                <CheckCircle2 size={14} />
                <span className="text-xs font-bold uppercase tracking-wide">Live URL</span>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[var(--clr-bg)] border border-[var(--clr-border)] text-[10px] text-[var(--clr-text-secondary)] break-all font-mono">
                creatoros.app/forms/7x2h-9kL
              </div>
              <Button variant="ghost" size="xs" className="w-full" rightIcon={<ChevronRight size={12} />}>
                Share Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
