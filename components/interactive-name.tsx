"use client"

import { useEffect, useRef, useState } from "react"

interface InteractiveNameProps {
  firstName: string
  lastName: string
  className?: string
}

export function InteractiveName({ firstName, lastName, className = "" }: InteractiveNameProps) {
  const nameRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        setMousePosition({
          x: (e.clientX - centerX) * 0.05,
          y: (e.clientY - centerY) * 0.05,
        })
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  const renderAnimatedText = (text: string, startDelay = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="simple-letter"
        style={{
          animationDelay: `${startDelay + index * 0.08}s`,
          transform: isHovered
            ? `translate(${mousePosition.x * (index + 1) * 0.01}px, ${mousePosition.y * (index + 1) * 0.01}px) scale(1.05)`
            : "translate(0, 0) scale(1)",
          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <div
      ref={nameRef}
      className={`simple-name-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className="simple-name text-foreground">
        <span className="name-part first-name">{renderAnimatedText(firstName, 0)}</span>
        <span className="name-part last-name">{renderAnimatedText(lastName, firstName.length * 0.08)}</span>
      </h1>
    </div>
  )
}
