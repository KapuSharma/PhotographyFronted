"use client";

import Link from "next/link";
import { Bot, Calendar } from "lucide-react";

import { useSiteStore } from "@/store/use-site-store";
import { Button } from "@/components/ui/button";

export function MobileActionBar() {
  const setChatOpen = useSiteStore((s) => s.setChatOpen);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
      <Button asChild className="flex-1">
        <Link href="/booking">
          <Calendar width={16} height={16} />
          Book
        </Link>
      </Button>
      <Button variant="ghost" className="flex-1" onClick={() => setChatOpen(true)}>
        <Bot width={16} height={16} />
        Ask AI
      </Button>
    </div>
  );
}
