"use client"

import {useState} from "react"
import {ImageData} from "@/data/sample";

interface ImageCarouselProps {
    images: ImageData[]
    compact?: boolean
}

export function ImageCarousel({images, compact = false}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }
    const currentImage = images[currentIndex]
    if (compact) {
        return (
            <div className="bg-white/65 backdrop-blur-md rounded-2xl p-4 shadow-2xl w-full max-w-2xl">
                {/* Image frame - compact version */}
                <div className="bg-gradient-to-br from-pink-100 to-white p-3 rounded-xl shadow-lg mb-3">
                    <img
                        src={currentImage.url || "/placeholder.svg"}
                        alt="Cute image"
                        className="w-full h-70 object-cover rounded-md"
                    />
                </div>

                {/* Text content - compact version */}
                <div className="text-center space-y-2 mb-3">
                    <h2 className="text-xl font-bold text-pink-600 animate-bounce-subtle">{currentImage.title}</h2>
                    <p className="text-pink-400 text-sm font-medium">{currentImage.subtitle}</p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleNext}
                        className="w-1/3 text-center cursor-pointer
                            bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500
                            text-white font-bold text-sm py-3 rounded-full shadow-lg
                            hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Tục tiệp đi!! ✨
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mt-3">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "w-6 bg-pink-500" : "w-1.5 bg-pink-200"
                            }`}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 relative overflow-hidden p-4">
            {/* Floating hearts decoration */}
            <div className="absolute top-20 right-20 text-4xl animate-float">💕</div>
            <div className="absolute bottom-32 left-16 text-3xl animate-float-delayed">🌸</div>
            <div className="absolute top-40 left-32 text-2xl animate-float-slow">✨</div>
            <div className="absolute bottom-20 right-32 text-3xl animate-float">💖</div>

            {/* Main card */}
            <div
                className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full border-2 border-white/60">
                {/* Image frame */}
                <div className="bg-gradient-to-br from-pink-100 to-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="bg-white p-3 rounded-xl shadow-inner">
                        <img
                            src={currentImage.url || "/placeholder.svg"}
                            alt="Cute image"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Text content */}
                <div className="text-center space-y-4 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-pink-600 animate-bounce-subtle">{currentImage.title}</h1>
                    <p className="text-pink-400 text-lg font-medium">{currentImage.subtitle}</p>
                </div>

                {/* Button */}
                <button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    Dấu coii! ✨
                </button>

                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "w-8 bg-pink-500" : "w-2 bg-pink-200"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
