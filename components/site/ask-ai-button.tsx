"use client";

import { Bot, MessageCircle } from "lucide-react";

import { useSiteStore } from "@/store/use-site-store";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

export function AskAiButton({
  label = "Ask the AI assistant",
  variant = "ghost",
  className,
  icon = "message",
}: {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
  icon?: "message" | "bot";
}) {
  const setChatOpen = useSiteStore((s) => s.setChatOpen);
  const Icon = icon === "bot" ? Bot : MessageCircle;

  return (
    <Button variant={variant} className={className} onClick={() => setChatOpen(true)}>
      <Icon width={17} height={17} />
      {label}
    </Button>
  );
}
