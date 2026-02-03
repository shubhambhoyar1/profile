"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
}

export function FloatingElements() {
  const elementsRef = useRef<FloatingElement[]>([])
  const mousePosRef = useRef({ x: 0, y: 0 })
  const intervalRef = useRef<NodeJS.Timeout>()
  const { theme } = useTheme()

  useEffect(() => {
    const initialElements: FloatingElement[] = []
    for (let i = 0; i < 15; i++) {
      initialElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * 360,
      })
    }
    elementsRef.current = initialElements

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      elementsRef.current = elementsRef.current.map((element) => {
        const dx = mousePosRef.current.x - element.x
        const dy = mousePosRef.current.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const attraction = Math.min(distance / 500, 1)
        const moveX = dx * 0.001 * attraction
        const moveY = dy * 0.001 * attraction

        return {
          ...element,
          x: element.x + moveX + Math.sin(Date.now() * 0.001 + element.id) * element.speed,
          y: element.y + moveY + Math.cos(Date.now() * 0.001 + element.id) * element.speed,
          rotation: element.rotation + 0.5,
        }
      })
    }

    intervalRef.current = setInterval(animate, 16) // ~60fps

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elementsRef.current.map((element) => (
        <div
          key={element.id}
          className={`absolute rounded-full blur-sm ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-400/20 to-purple-400/20"
              : "bg-gradient-to-br from-blue-500/15 to-purple-500/15"
          }`}
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
            opacity: element.opacity,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  )
}
