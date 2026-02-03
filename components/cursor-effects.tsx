"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let mousePos = { x: 0, y: 0 }
    let animationId: number

    const isDark = theme === "dark"
    const particleColors = isDark
      ? ["rgba(59, 130, 246, 0.8)", "rgba(147, 51, 234, 0.8)", "rgba(236, 72, 153, 0.8)"]
      : ["rgba(59, 130, 246, 0.6)", "rgba(147, 51, 234, 0.6)", "rgba(236, 72, 153, 0.6)"]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY }

      const newParticles: Particle[] = []
      for (let i = 0; i < 2; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 4 + 1,
          opacity: 1,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        })
      }

      particles = [...particles, ...newParticles].slice(-50)
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles = particles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: particle.opacity - 0.008,
          size: particle.size * 0.995,
        }))
        .filter((particle) => particle.opacity > 0)

      particles.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      if (mousePos.x && mousePos.y) {
        const glowColor = isDark ? "59, 130, 246" : "147, 51, 234"
        const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 100)
        gradient.addColorStop(0, `rgba(${glowColor}, ${isDark ? 0.15 : 0.1})`)
        gradient.addColorStop(1, `rgba(${glowColor}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(mousePos.x - 100, mousePos.y - 100, 200, 200)
      }

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}
