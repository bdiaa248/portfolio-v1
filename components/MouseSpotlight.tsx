"use client";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import React, { MouseEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes"; // استدعينا هوك الثيم

export const MouseSpotlight = () => {
  const { theme } = useTheme(); // بنجيب الثيم الحالي
  const [mounted, setMounted] = useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // عشان نتأكد إن الكود شغال في المتصفح مش السيرفر
  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // تتبع الماوس في الصفحة كلها
  React.useEffect(() => {
    const updateMousePosition = (ev: globalThis.MouseEvent) => {
      mouseX.set(ev.clientX);
      mouseY.set(ev.clientY);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mouseX, mouseY]);

  // دالة بتختار اللون بناء على الثيم
  const getSpotlightColor = () => {
    if (!mounted) return "rgba(242, 138, 73, 0.10)"; // لون افتراضي

    // لو الوضع هو "ضياء"، استخدم الأزرق الملكي
    if (theme === "diaa-theme") {
      return "rgba(59, 130, 246, 0.15)"; // أزرق شفاف وهادي
    }

    // غير كده (Light/Dark) خليك برتقالي دافئ
    return "rgba(242, 138, 73, 0.10)";
  };

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-500"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            ${getSpotlightColor()},
            transparent 80%
          )
        `,
      }}
    />
  );
};