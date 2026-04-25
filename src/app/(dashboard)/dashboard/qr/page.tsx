"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { QrCode, Download, Palette, Link, Type, RefreshCw } from "lucide-react";

/* ============================================
   QR CODE GENERATOR
   Uses the free api.qrserver.com endpoint.
============================================ */
export default function QRGeneratorPage() {
  const [url, setUrl] = useState("https://creatoros.app");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#5B21B6");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [margin, setMargin] = useState(2);
  const [generated, setGenerated] = useState(false);

  // Build QR URL from qrserver.com
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}&margin=${margin}&format=png`;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = "qr-code.png";
    a.target = "_blank";
    a.click();
  };

  return (
    <DashboardShell title="QR Code Generator">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
            <QrCode size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">QR Code Generator</h1>
            <p className="text-sm text-[var(--clr-text-secondary)]">Create branded QR codes for any URL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
          {/* Config Panel */}
          <div className="space-y-4">
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Content</p>
              <Input
                label="URL or Text"
                leadingIcon={<Link size={14} />}
                placeholder="https://your-site.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Style</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Foreground Color</label>
                  <div className="flex items-center gap-2 h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-sm font-mono text-[var(--clr-text-primary)]">{fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Background Color</label>
                  <div className="flex items-center gap-2 h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-sm font-mono text-[var(--clr-text-primary)]">{bgColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Size: {size}px</label>
                <input
                  type="range" min={100} max={600} step={50}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[var(--clr-secondary)]"
                />
                <div className="flex justify-between text-xs text-[var(--clr-text-muted)] mt-1">
                  <span>100px</span><span>600px</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Margin: {margin}</label>
                <input
                  type="range" min={0} max={10} step={1}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-[var(--clr-secondary)]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="gradient" className="flex-1" leftIcon={<QrCode size={14} />} onClick={() => setGenerated(true)}>
                Generate QR Code
              </Button>
              <Button variant="outline" size="md" leftIcon={<Download size={14} />} onClick={handleDownload}>
                Download PNG
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 flex flex-col items-center justify-center gap-4">
            <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider self-start">Preview</p>
            <div className="p-4 rounded-[12px] border border-[var(--clr-border)]" style={{ background: bgColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrSrc}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <p className="text-xs text-[var(--clr-text-muted)] text-center break-all">{url}</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
