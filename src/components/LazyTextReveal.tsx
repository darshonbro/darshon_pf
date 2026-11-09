"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface LazyTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "letter" | "word";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  once?: boolean;
}

export default function LazyTextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.022,
  mode = "letter",
  as = "span",
  once = false,
}: LazyTextRevealProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(6px)",
      rotateX: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[as] as typeof motion.span;

  if (mode === "word") {
    const words = text.split(" ");
    return (
      <Component
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        className={`inline-block [perspective:800px] ${className}`}
      >
        {words.map((word, idx) => (
          <React.Fragment key={idx}>
            <motion.span
              variants={itemVariants}
              className="inline-block will-change-transform will-change-filter"
            >
              {word}
            </motion.span>
            {idx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </React.Fragment>
        ))}
      </Component>
    );
  }

  // Letter mode
  const words = text.split(" ");
  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      className={`inline-block [perspective:800px] ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={itemVariants}
              className="inline-block will-change-transform will-change-filter"
            >
              {char}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

