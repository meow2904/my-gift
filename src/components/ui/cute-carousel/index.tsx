"use client"

import React, {useRef, useState, type TouchEvent, type MouseEvent} from "react"
import {ImageData} from "@/data/sample"
import Link from "next/link"

interface ImageCarouselProps {
    images: ImageData[]
    finalContent?: React.ReactNode
    returnHome?: () => void
}

export function ImageCarousel({images, finalContent, returnHome}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showFinal, setShowFinal] = useState(false)
    const [dragStart, setDragStart] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        } else if (finalContent) {
            setShowFinal(true)
        }
    }

    const handlePrevious = () => {
        if (showFinal) {
            setShowFinal(false)
        } else if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const handleProgressClick = (index: number) => {
        setShowFinal(false)
        setCurrentIndex(index)
    }

    // --- Drag logic ---
    const handleDragStart = (clientX: number) => {
        setDragStart(clientX)
    }

    const handleDragMove = (clientX: number) => {
        if (dragStart !== null) {
            const offset = clientX - dragStart
            // ✅ Giới hạn phạm vi kéo tối đa ±80px
            const clampedOffset = Math.max(-150, Math.min(150, offset))
            setDragOffset(clampedOffset)
        }
    }

    const handleDragEnd = () => {
        if (dragStart !== null) {
            if (dragOffset < -50) handleNext()
            else if (dragOffset > 50) handlePrevious()
            setDragStart(null)
            setDragOffset(0)
        }
    }

    // Touch events
    const handleTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX)
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX)
    const handleTouchEnd = () => handleDragEnd()

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => handleDragStart(e.clientX)
    const handleMouseMove = (e: MouseEvent) => dragStart !== null && handleDragMove(e.clientX)
    const handleMouseUp = () => handleDragEnd()
    const handleMouseLeave = () => dragStart !== null && handleDragEnd()

    const currentImage = images[currentIndex]

    return (
        <div
            className="bg-white/65 backdrop-blur-md rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl md:shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl overflow-hidden">
            {/* 🖼 Chỉ phần này có hiệu ứng slide */}
            <div
                ref={containerRef}
                className="slide select-none cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `translateX(${dragOffset}px)`,
                    transition: dragStart !== null ? "none" : "transform 0.3s ease-out",
                }}
            >
                {
                    !showFinal ? (
                            <div className="pb-2">
                                <div className="w-full max-w-md from-pink-50 to-white p-2 rounded-2xl shadow-2xl">
                                    {/* Image frame - compact version */}
                                    <div className="bg-gradient-to-br from-pink-200 to-white p-0 rounded-3xl shadow-lg mb-4">
                                        <img
                                            src={currentImage.url || "/placeholder.svg"}
                                            alt="Cute image"
                                            className="w-full h-70 object-cover rounded-3xl pointer-events-none"
                                            draggable={false}
                                        />
                                    </div>

                                    {/* Text content - compact version */}
                                    <div className="text-center space-y-2">
                                        <h2 className="text-xl font-bold text-pink-600 animate-bounce-subtle">{currentImage.title}</h2>
                                        <p className="text-pink-400 text-sm font-medium">{currentImage.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <>
                                {/* Final content */}
                                <div
                                    className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-inner mb-6">
                                    {finalContent}
                                </div>
                            </>
                        )
                }
            </div>
            {/* Next button */}
            {
                !showFinal ? (
                        <>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleNext}
                                    className="w-1/3 text-center cursor-pointer
                        bg-gradient-to-r from-pink-400 to-purple-300
                        text-white font-bold text-sm py-3 rounded-full shadow-lg
                        hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Kéo sang đi!! ✨
                                </button>
                            </div>
                        </>
                    ) :
                    (
                        <>

                            <div className="flex justify-center">
                                <Link
                                    href="/"
                                    className="w-1/3 text-center cursor-pointer
                                    bg-gradient-to-r from-pink-500  to-purple-500
                                    text-white font-bold text-sm py-3 rounded-full shadow-lg
                                    hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    onClick={returnHome}
                                >
                                    Home 💖
                                </Link>
                            </div>
                        </>
                    )
            }


            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mt-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleProgressClick(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentIndex ? "w-6 bg-pink-500" : "w-1.5 bg-pink-200 hover:bg-pink-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
