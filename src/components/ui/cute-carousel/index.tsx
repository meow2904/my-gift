"use client"

import React, { useRef, useState, useEffect, useCallback, memo } from "react"
import { ImageData } from "@/data/sample"
import Link from "next/link"
import Image from "next/image"

interface ImageCarouselProps {
    images: ImageData[]
    finalContent?: React.ReactNode
    returnHome?: () => void
}

export const ImageCarousel = ({ images, finalContent, returnHome }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showFinal, setShowFinal] = useState(false)
    const [dragStart, setDragStart] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentImage = images[currentIndex]

    // --- Handlers ---
    const handleNext = useCallback(() => {
        if (currentIndex < images.length - 1) setCurrentIndex((i) => i + 1)
        else if (finalContent) setShowFinal(true)
    }, [currentIndex, images.length, finalContent])

    const handlePrevious = useCallback(() => {
        if (showFinal) return setShowFinal(false)
        if (currentIndex > 0) setCurrentIndex((i) => i - 1)
    }, [currentIndex, showFinal])

    const handleProgressClick = (index: number) => {
        setShowFinal(false)
        setCurrentIndex(index)
    }

    // --- Drag logic ---
    const handleDragStart = (x: number) => setDragStart(x)
    const handleDragMove = (x: number) => dragStart !== null && setDragOffset(Math.max(-150, Math.min(150, x - dragStart)))
    const handleDragEnd = () => {
        if (dragStart === null) return
        if (dragOffset < -50) handleNext()
        else if (dragOffset > 50) handlePrevious()
        setDragStart(null)
        setDragOffset(0)
    }

    // --- Touch & Mouse handlers ---
    const bindDragEvents = {
        onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX),
        onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX),
        onTouchEnd: handleDragEnd,
        onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
        onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
    }

    // --- Preload ảnh ---
    useEffect(() => {
        if (typeof window === "undefined") return
        const preload = (index: number) => {
            if (images[index]) {
                const img = new window.Image()
                img.src = images[index].url
            }
        }
        preload(currentIndex + 1)
        preload(currentIndex - 1)
    }, [currentIndex, images])

    // --- JSX ---
    return (
        <div className="bg-white/65 backdrop-blur-md rounded-2xl p-4 shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl overflow-hidden">
            <div
                ref={containerRef}
                {...bindDragEvents}
                className="relative select-none cursor-grab active:cursor-grabbing transition-transform duration-300"
                style={{
                    transform: `translateX(${dragOffset}px)`,
                }}
            >
                {!showFinal ? (
                    <div className="pb-2">
                        <div className="w-full from-pink-50 to-white p-2 rounded-2xl shadow-2xl">
                            <div className="bg-gradient-to-br from-pink-200 to-white p-0 rounded-3xl shadow-lg mb-4 overflow-hidden">
                                <div className="relative w-full h-60 sm:h-72 md:h-80">
                                    <Image
                                        src={currentImage.url || "/placeholder.svg"}
                                        alt="Cute image"
                                        fill
                                        className="object-cover pointer-events-none select-none transition-opacity duration-500"
                                        priority={currentIndex === 0}
                                        sizes="(max-width: 768px) 100vw, 500px"
                                    />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-bold text-pink-600 animate-bounce-subtle">
                                    {currentImage.title}
                                </h2>
                                <p className="text-pink-400 text-sm font-medium">{currentImage.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-inner mb-6">
                        {finalContent}
                    </div>
                )}
            </div>

            {/* --- Buttons --- */}
            <div className="flex justify-center mt-2">
                {!showFinal ? (
                    <button
                        onClick={handleNext}
                        className="w-1/3 text-center cursor-pointer bg-gradient-to-r from-pink-400 to-purple-300 text-white font-bold text-sm py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Kéo sang đi!! ✨
                    </button>
                ) : (
                    <Link
                        href="/"
                        onClick={returnHome}
                        className="w-1/3 text-center cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Home 💖
                    </Link>
                )}
            </div>

            {/* --- Progress indicator --- */}
            <div className="flex justify-center gap-2 mt-3">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleProgressClick(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === currentIndex ? "w-6 bg-pink-500" : "w-1.5 bg-pink-200 hover:bg-pink-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
