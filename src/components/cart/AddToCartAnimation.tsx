"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function AddToCartAnimation() {
  const { addToCartAnim, resetAddToCartAnimation, triggerShake } = useCart();
  const controls = useAnimation();
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (addToCartAnim.active && addToCartAnim.startPos) {
      // 1. Determine Target
      const desktopIcon = document.getElementById("cart-icon-desktop");
      const mobileIcon = document.getElementById("cart-icon-mobile");

      let targetRect: DOMRect | null = null;

      // Check visibility logic:
      // If window > 768 (md breakpoint), try desktop first
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop && desktopIcon && desktopIcon.offsetParent !== null) {
         targetRect = desktopIcon.getBoundingClientRect();
      } else if (mobileIcon && mobileIcon.offsetParent !== null) {
         targetRect = mobileIcon.getBoundingClientRect();
      } else {
        // Fallback: If neither is visible (unlikely), default to corner
        targetRect = {
           left: window.innerWidth - 50,
           top: 20,
           width: 0,
           height: 0,
           right: window.innerWidth - 50,
           bottom: 20,
           x: window.innerWidth - 50,
           y: 20,
           toJSON: () => {}
        } as DOMRect;
      }

      if (targetRect) {
        // Center of the target icon
        const tx = targetRect.left + targetRect.width / 2;
        const ty = targetRect.top + targetRect.height / 2;

        setTargetPos({ x: tx, y: ty });
        setIsVisible(true);

        const runAnimation = async () => {
          // Reset position to start
          await controls.set({
            left: addToCartAnim.startPos!.left + addToCartAnim.startPos!.width / 2,
            top: addToCartAnim.startPos!.top + addToCartAnim.startPos!.height / 2,
            scale: 1,
            opacity: 1,
            x: "-50%", // Center anchor
            y: "-50%", // Center anchor
          });

          // Calculate angle for "comet trail" orientation
          const startX = addToCartAnim.startPos!.left;
          const startY = addToCartAnim.startPos!.top;
          const dx = tx - startX;
          const dy = ty - startY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          // Animate flight
          await controls.start({
            left: tx,
            top: ty,
            scaleX: [1, 1.5, 0.5], // Stretch during flight, shrink at end
            scaleY: [1, 0.6, 0.5], // Thin out
            rotate: angle, // Point towards destination
            opacity: [1, 0.8, 0], // Fade out at end
            transition: {
              duration: 0.8,
              ease: "easeInOut", // Bezier feel
            },
          });

          // Trigger Impact
          triggerShake();

          // Cleanup
          setIsVisible(false);
          resetAddToCartAnimation();
        };

        runAnimation();
      }
    }
  }, [addToCartAnim, controls, resetAddToCartAnimation, triggerShake]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        animate={controls}
        initial={{ opacity: 0 }}
        className="absolute w-6 h-6 rounded-full bg-neon-pink shadow-[0_0_15px_rgba(224,64,171,0.8)] blur-[1px]"
        style={{ willChange: "transform, left, top" }}
      >
        {/* Trail Effect (Pseudo-element via child div to avoid complex CSS transforms on main element) */}
        <div className="absolute inset-0 bg-neon-pink rounded-full blur-md opacity-50 -z-10 transform scale-x-150" />
      </motion.div>
    </div>
  );
}
