// ─── Builder Types ────────────────────────────────────────────────────────────

export type BlockType =
  | "hero"
  | "features"
  | "testimonials"
  | "pricing"
  | "cta"
  | "image"
  | "text"
  | "divider"
  | "code"
  | "navbar";

export interface BlockStyle {
  paddingTop?: string;
  paddingBottom?: string;
  borderRadius?: string;
  background?: string;
  fontFamily?: string;
}

export interface BlockData {
  id: string;
  type: BlockType;
  props: Record<string, string | string[]>;
  style?: BlockStyle;
  mobileStyle?: BlockStyle;
  hidden?: boolean;
}

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: React.ElementType;
  defaultProps: Record<string, string | string[]>;
  category: "layout" | "content" | "media" | "advanced";
}

export interface PageData {
  id: string;
  name: string;
  blocks: BlockData[];
  thumbnail?: string;
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
