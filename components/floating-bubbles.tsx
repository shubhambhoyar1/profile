"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Bubble {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  floatSpeed: number
  floatAngle: number
  floatPhase: number // Added phase for more organic motion
}

export function FloatingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const getIntroSectionHeight = () => {
      const navElement = document.querySelector("nav")
      if (navElement) {
        const rect = navElement.getBoundingClientRect()
        return rect.bottom + window.scrollY - 50
      }
      return window.innerHeight * 0.65
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createBubbles = () => {
      const introHeight = getIntroSectionHeight()
      const bubbleCount = Math.min(7, Math.floor(canvas.width / 180))
      bubblesRef.current = []

      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * Math.min(introHeight, canvas.height * 0.6),
          vx: 0,
          vy: 0,
          size: 40 + Math.random() * 30, // Slightly larger for better visibility
          opacity: 0.25 + Math.random() * 0.25, // Softer opacity range
          hue: 200 + Math.random() * 80, // Blue to purple range
          floatSpeed: 0.5 + Math.random() * 0.5, // Slower, more liquid-like
          floatAngle: Math.random() * Math.PI * 2,
          floatPhase: Math.random() * Math.PI * 2, // Random phase offset
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const bubbles = bubblesRef.current
      const mouse = mouseRef.current
      const isDark = theme === "dark"
      const introHeight = getIntroSectionHeight()
      const repelDistance = 180 // Increased for gentler, earlier repulsion

      bubbles.forEach((bubble) => {
        bubble.floatAngle += 0.008 // Slower rotation
        bubble.floatPhase += 0.005
        const floatX = Math.sin(bubble.floatAngle + bubble.floatPhase) * bubble.floatSpeed
        const floatY = Math.cos(bubble.floatAngle * 0.6 + bubble.floatPhase * 0.8) * bubble.floatSpeed * 0.7

        const dx = bubble.x - mouse.x
        const dy = bubble.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < repelDistance && distance > 0) {
          const force = Math.pow((repelDistance - distance) / repelDistance, 2) * 0.8 // Quadratic easing for smoothness
          const angle = Math.atan2(dy, dx)
          bubble.vx += Math.cos(angle) * force
          bubble.vy += Math.sin(angle) * force
        }

        bubble.x += bubble.vx + floatX
        bubble.y += bubble.vy + floatY
        bubble.vx *= 0.92 // Slower damping for more fluid motion
        bubble.vy *= 0.92

        // Boundary constraints
        const margin = bubble.size
        if (bubble.x < margin) {
          bubble.x = margin
          bubble.vx *= -0.3 // Softer bounce
        }
        if (bubble.x > canvas.width - margin) {
          bubble.x = canvas.width - margin
          bubble.vx *= -0.3
        }
        if (bubble.y < margin) {
          bubble.y = margin
          bubble.vy *= -0.3
        }
        if (bubble.y > introHeight - margin) {
          bubble.y = introHeight - margin
          bubble.vy *= -0.3
        }

        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.2,
          bubble.y - bubble.size * 0.2,
          0,
          bubble.x,
          bubble.y,
          bubble.size,
        )

        if (isDark) {
          // Glassy effect for dark mode
          gradient.addColorStop(0, `hsla(${bubble.hue}, 75%, 75%, ${bubble.opacity * 0.9})`)
          gradient.addColorStop(0.3, `hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity * 0.6})`)
          gradient.addColorStop(0.7, `hsla(${bubble.hue}, 65%, 50%, ${bubble.opacity * 0.3})`)
          gradient.addColorStop(1, `hsla(${bubble.hue}, 60%, 40%, 0)`)
        } else {
          // Glassy effect for light mode
          gradient.addColorStop(0, `hsla(${bubble.hue}, 65%, 60%, ${bubble.opacity * 0.8})`)
          gradient.addColorStop(0.3, `hsla(${bubble.hue}, 60%, 50%, ${bubble.opacity * 0.5})`)
          gradient.addColorStop(0.7, `hsla(${bubble.hue}, 55%, 40%, ${bubble.opacity * 0.25})`)
          gradient.addColorStop(1, `hsla(${bubble.hue}, 50%, 30%, 0)`)
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fill()

        // Outer border
        ctx.strokeStyle = isDark ? `hsla(${bubble.hue}, 70%, 80%, 0.25)` : `hsla(${bubble.hue}, 60%, 35%, 0.2)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Inner highlight for glass effect
        ctx.beginPath()
        ctx.arc(bubble.x - bubble.size * 0.25, bubble.y - bubble.size * 0.25, bubble.size * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `hsla(${bubble.hue}, 80%, 90%, ${bubble.opacity * 0.3})`
          : `hsla(${bubble.hue}, 70%, 70%, ${bubble.opacity * 0.25})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createBubbles()
    animate()

    // Event listeners
    const handleResize = () => {
      resizeCanvas()
      createBubbles()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
      }}
    />
  )
}
