"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  RotateCw, 
  ExternalLink, 
  Monitor, 
  Smartphone, 
  Tablet,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FileItem } from "./FileExplorer";

interface PreviewPanelProps {
  files: FileItem[];
  isVisible: boolean;
}

export function PreviewPanel({ files, isVisible }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const generatePreview = () => {
    const htmlFile = files.find(f => f.name.endsWith(".html")) || { content: "<h1>No HTML file found</h1>" };
    const cssFiles = files.filter(f => f.name.endsWith(".css"));
    const jsFiles = files.filter(f => f.name.endsWith(".js"));

    let combinedHtml = htmlFile.content;

    // Inject CSS
    const cssContent = cssFiles.map(f => `<style id="${f.name}">${f.content}</style>`).join("\n");
    combinedHtml = combinedHtml.replace("</head>", `${cssContent}</head>`);
    if (!combinedHtml.includes("</head>")) {
       combinedHtml = `<style>${cssContent}</style>` + combinedHtml;
    }

    // Inject JS
    const jsContent = jsFiles.map(f => `<script id="${f.name}">${f.content}</script>`).join("\n");
    combinedHtml = combinedHtml.replace("</body>", `${jsContent}</body>`);
    if (!combinedHtml.includes("</body>")) {
       combinedHtml = combinedHtml + `<script>${jsContent}</script>`;
    }

    return combinedHtml;
  };

  useEffect(() => {
    const updatePreview = () => {
      if (iframeRef.current && isVisible) {
        const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
        if (doc) {
          try {
            doc.open();
            doc.write(generatePreview());
            doc.close();
          } catch (e) {
            console.error("Preview render error:", e);
          }
        }
      }
    };

    // Small delay to ensure iframe is ready
    const timer = setTimeout(updatePreview, 100);
    return () => clearTimeout(timer);
  }, [files, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flex-1 flex flex-col bg-[#0F0F13] border-l border-white/5">
      <div className="h-9 px-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-2">
           <Globe size={14} className="text-indigo-400" />
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Preview</span>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/5 mr-2">
              <button 
                onClick={() => setViewport("desktop")}
                className={cn("p-1 rounded transition-all", viewport === "desktop" ? "bg-indigo-500 text-white" : "text-gray-500 hover:text-gray-300")}
              >
                <Monitor size={12} />
              </button>
              <button 
                onClick={() => setViewport("tablet")}
                className={cn("p-1 rounded transition-all", viewport === "tablet" ? "bg-indigo-500 text-white" : "text-gray-500 hover:text-gray-300")}
              >
                <Tablet size={12} />
              </button>
              <button 
                onClick={() => setViewport("mobile")}
                className={cn("p-1 rounded transition-all", viewport === "mobile" ? "bg-indigo-500 text-white" : "text-gray-500 hover:text-gray-300")}
              >
                <Smartphone size={12} />
              </button>
           </div>
           
           <button 
             onClick={() => {
                const win = window.open();
                win?.document.write(generatePreview());
                win?.document.close();
             }}
             className="p-1.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors"
           >
              <ExternalLink size={14} />
           </button>
           <button className="p-1.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors">
              <RotateCw size={14} />
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center overflow-hidden relative">
         {/* Simple Grid Background for Canvas feel */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
         
         <div className={cn(
           "bg-white shadow-2xl transition-all duration-300 ease-in-out h-[95%]",
           viewport === "desktop" ? "w-[95%]" : viewport === "tablet" ? "w-[768px]" : "w-[375px]"
         )}>
            <iframe 
              ref={iframeRef}
              className="w-full h-full border-none"
              title="preview"
            />
         </div>
      </div>
    </div>
  );
}
