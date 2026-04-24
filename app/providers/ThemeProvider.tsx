"use client";

import React, { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ نقرأ الثيم بعد ما الصفحة تفتح (حل hydration)
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setDarkMode(saved === "dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDark);
    }

    setMounted(true);
  }, []);

  // ✅ نطبق الثيم
  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  // ✅ System preference live (اختياري بس جامد 🔥)
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark");

    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");

      // لو المستخدم مختارش بنفسه → امشي مع السيستم
      // if (!saved) {
        setDarkMode(e.matches);
      // }
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // ✅ مهم جدًا: نمنع render قبل mount
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}