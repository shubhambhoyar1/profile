"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParallaxBackground() {
  const mousePosRef = useRef({ x: 0, y: 0 })
  const scrollYRef = useRef(0)
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      }
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isDark = theme === "dark"
  const layer1Opacity = isDark ? 0.3 : 0.2
  const layer2Opacity = isDark ? 0.2 : 0.15
  const layer3Opacity = isDark ? 0.1 : 0.08

  const layer1Colors = isDark
    ? "rgba(120, 119, 198, 0.1), rgba(255, 119, 198, 0.1)"
    : "rgba(120, 119, 198, 0.08), rgba(255, 119, 198, 0.08)"

  const layer2Colors = isDark
    ? "rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)"
    : "rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.08)"

  const layer3Colors = isDark
    ? "rgba(16, 185, 129, 0.1), rgba(245, 101, 101, 0.1)"
    : "rgba(16, 185, 129, 0.06), rgba(245, 101, 101, 0.06)"

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest */}
      <div
        className="absolute inset-0"
        style={{
          opacity: layer1Opacity,
          transform: `translate(${mousePosRef.current.x * 10}px, ${mousePosRef.current.y * 10 + scrollYRef.current * 0.1}px)`,
          background: `radial-gradient(circle at 20% 80%, ${layer1Colors.split(", ")[0]} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${layer1Colors.split(", ")[1]} 0%, transparent 50%)`,
        }}
      />

      {/* Layer 2 - Medium */}
      <div
        className="absolute inset-0"
        style={{
          opacity: layer2Opacity,
          transform: `translate(${mousePosRef.current.x * 20}px, ${mousePosRef.current.y * 20 + scrollYRef.current * 0.2}px)`,
          background: `radial-gradient(circle at 60% 40%, ${layer2Colors.split(", ")[0]} 0%, transparent 50%), radial-gradient(circle at 40% 60%, ${layer2Colors.split(", ")[1]} 0%, transparent 50%)`,
        }}
      />

      {/* Layer 3 - Fastest */}
      <div
        className="absolute inset-0"
        style={{
          opacity: layer3Opacity,
          transform: `translate(${mousePosRef.current.x * 30}px, ${mousePosRef.current.y * 30 + scrollYRef.current * 0.3}px)`,
          background: `radial-gradient(circle at 90% 10%, ${layer3Colors.split(", ")[0]} 0%, transparent 50%), radial-gradient(circle at 10% 90%, ${layer3Colors.split(", ")[1]} 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}
