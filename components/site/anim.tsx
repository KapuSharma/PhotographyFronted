"use client";

/* =====================================================================
   Motion primitives for the HOI studio template.
   Thin wrappers over `motion` so pages (server components) can compose
   smooth scroll-reveals, staggered lists, 3D tilt cards, parallax and
   count-up stats without repeating boilerplate. All respect
   prefers-reduced-motion.
   ===================================================================== */

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + slide-in when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

/** Interactive 3D tilt card — follows the pointer with spring physics. */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(400px circle at ${x}% ${y}%, rgba(255,255,255,0.28), transparent 45%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", ...style }}
      className={cn("relative [transform:perspective(1200px)]", className)}
    >
      {children}
      {glare && !reduce ? (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      ) : null}
    </motion.div>
  );
}

/** Scroll-linked vertical parallax for hero art / floating layers. */
export function Parallax({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  useEffect(() => {
    setRange(speed);
  }, [speed]);
  const y = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      y.set((progress - 0.5) * range * 2);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [range, reduce, y]);
  const sy = useSpring(y, { stiffness: 120, damping: 30 });
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : sy }} className={className}>
      {children}
    </motion.div>
  );
}

/** Animated number that counts up when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  className,
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);
  const display = Number.isInteger(to) ? Math.round(val).toLocaleString() : val.toFixed(1);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Convenience motion wrappers for bespoke one-offs. */
export const M = motion;
