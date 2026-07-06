"use client";

/* =====================================================================
   Motion primitives for the new "Aria" premium template.
   Thin wrappers over Framer Motion (the project's `motion` package) so
   sections stay clean: scroll-reveal, pointer-driven 3D tilt, hero
   parallax, and a self-drawing timeline line. All respect
   prefers-reduced-motion.
   ===================================================================== */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode, type CSSProperties } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + slide up when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reduce ? undefined : item}>{children}</motion.div>;
}

/** Pointer-driven 3D tilt with spring physics + optional hover lift/scale. */
export function Tilt({
  children,
  className,
  intensity = 9,
  scale = 1.03,
  lift = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  lift?: boolean;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
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
      whileHover={reduce ? undefined : { scale, y: lift ? -6 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 1000, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-linked vertical parallax (for the hero image). */
export function Parallax({ children, className, distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** A dotted connector line that "draws itself" left→right when in view. */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ borderTopWidth: 2, borderTopStyle: "dotted" }}
      initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.6, ease: EASE }}
    />
  );
}

export const M = motion;
