"use client"

import type React from "react"

import { useParams } from "next/navigation"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"
import ImageSlider from "@/components/ui/image-slider";

const BoxDetail: React.FC = () => {
    const params = useParams()
    const id = params.id as string

    const [opened, setOpened] = useState(false)
    const lidControls = useAnimation()
    const messageControls = useAnimation()

    const handleClick = async () => {
        if (opened) return
        setOpened(true)

        await lidControls.start({
            rotateX: -10,
            rotateZ: -65,
            x: -140,
            y: 30,
            z: -10,
            transition: {
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1],
            },
        })

        messageControls.start({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, delay: 0.2 },
        })
    }

    const fixedIcons = [
        { icon: "🎂", top: "15%", left: "15%", rotation: -10 },
        { icon: "😊", top: "12%", left: "70%", rotation: 5 },
        { icon: "💖", top: "38%", left: "40%", rotation: 0 },
        { icon: "⭐", top: "50%", left: "25%", rotation: 15 },
        { icon: "🧁", top: "80%", left: "25%", rotation: -20 },
        { icon: "🥰", top: "85%", left: "75%", rotation: 10 },
        { icon: "🎉", top: "65%", left: "85%", rotation: -15 },
        { icon: "🎈", top: "65%", left: "60%", rotation: -15 },
        { icon: "🍰", top: "65%", left: "30%", rotation: -15 },
        { icon: "✨", top: "75%", left: "5%", rotation: -15 },
        { icon: "💝", top: "55%", left: "7%", rotation: -15 },
        { icon: "🌟", top: "45%", left: "10%", rotation: -15 },
        { icon: "🎁", top: "55%", left: "67%", rotation: -15 },
        { icon: "🍭", top: "40%", left: "88%", rotation: -15 },
        { icon: "🦄", top: "37%", left: "65%", rotation: -15 },
    ]

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
            <motion.div
                className="absolute"
                style={{
                    width: "1000px",
                    height: "1000px",
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,250,240,0.6) 15%, rgba(255,245,220,0.4) 30%, rgba(255,240,200,0.25) 45%, rgba(255,235,180,0.15) 60%, rgba(255,230,160,0.08) 75%, transparent 100%)",
                    filter: "blur(60px)",
                    zIndex: 0,
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute"
                style={{
                    width: "1200px",
                    height: "1200px",
                    background:
                        "radial-gradient(circle, rgba(255,248,220,0.5) 0%, rgba(255,245,200,0.3) 25%, rgba(255,240,180,0.15) 50%, rgba(255,235,160,0.08) 70%, transparent 100%)",
                    filter: "blur(80px)",
                    zIndex: 0,
                }}
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        zIndex: 0,
                        background: "rgba(255,250,230,0.9)",
                        boxShadow: "0 0 15px rgba(255,250,230,0.8)",
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.2, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 3,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <motion.div
                className="absolute"
                style={{
                    width: "900px",
                    height: "900px",
                    zIndex: 0,
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            >
                {[...Array(8)].map((_, i) => {
                    const colors = [
                        "linear-gradient(to right, rgba(255,100,100,0.5), rgba(255,200,100,0.3), transparent)",
                        "linear-gradient(to right, rgba(255,200,100,0.5), rgba(255,255,100,0.3), transparent)",
                        "linear-gradient(to right, rgba(100,255,100,0.5), rgba(100,255,200,0.3), transparent)",
                        "linear-gradient(to right, rgba(100,200,255,0.5), rgba(100,150,255,0.3), transparent)",
                        "linear-gradient(to right, rgba(150,100,255,0.5), rgba(200,100,255,0.3), transparent)",
                        "linear-gradient(to right, rgba(255,100,200,0.5), rgba(255,150,200,0.3), transparent)",
                        "linear-gradient(to right, rgba(255,150,150,0.5), rgba(255,180,150,0.3), transparent)",
                        "linear-gradient(to right, rgba(200,150,255,0.5), rgba(220,180,255,0.3), transparent)",
                    ]
                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 origin-left"
                            style={{
                                width: "450px",
                                height: "4px",
                                background: colors[i],
                                transform: `rotate(${i * 45}deg)`,
                                filter: "blur(3px)",
                            }}
                        />
                    )
                })}
            </motion.div>

            {[...Array(12)].map((_, i) => {
                const sparkleColors = [
                    "rgba(255,100,100,1)",
                    "rgba(255,200,100,1)",
                    "rgba(255,255,100,1)",
                    "rgba(100,255,200,1)",
                    "rgba(100,150,255,1)",
                    "rgba(200,100,255,1)",
                ]
                return (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            zIndex: 0,
                            background: sparkleColors[i % sparkleColors.length],
                            boxShadow: `0 0 10px ${sparkleColors[i % sparkleColors.length]}`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                )
            })}

            <div className="relative cursor-pointer" style={{ perspective: "1000px", zIndex: 10 }} onClick={handleClick}>
                {/* Container 3D */}
                <div className="relative">
                    {/* Thân hộp */}
                    <div
                        className="w-64 h-56 bg-gradient-to-br from-red-500 to-red-600 rounded-lg
                            shadow-2xl relative overflow-hidden"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(0px)",
                        }}
                    >
                        {fixedIcons.map((item, i) => (
                            <div
                                key={i}
                                className="absolute text-xl"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    transform: `rotate(${item.rotation}deg)`,
                                    zIndex: 5, // đảm bảo nằm trên bề mặt hộp, dưới nắp
                                }}
                            >
                                {item.icon}
                            </div>
                        ))}

                        {/* Ribbon dọc */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-yellow-300 to-yellow-400 shadow-lg" />

                        {/* Ribbon ngang */}
                        <div className="absolute top-1/3 -translate-y-1/2 left-0 w-full h-6 bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-lg" />

                        {/* Thông điệp bên trong */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={messageControls}
                            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 h-[300] w-[300]"
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl text-center w-full h-full">
                                {/*<div className="text-6xl mb-4">🎁</div>*/}
                                {/*<h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">*/}
                                {/*    Dành cho bạn!*/}
                                {/*</h2>*/}
                                {/*<p className="text-gray-700 text-lg">Đéo có gì cả! 🎉</p>*/}
                                <ImageSlider/>
                            </div>


                        </motion.div>

                        {/* Hiệu ứng ánh sáng */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Nắp hộp */}
                    <motion.div
                        animate={lidControls}
                        className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-20 bg-gradient-to-br from-red-600 to-red-700
                            rounded-t-lg shadow-2xl"
                        style={{
                            transformStyle: "preserve-3d",
                            transformOrigin: "bottom center",
                            zIndex: 30,
                        }}
                    >
                        {/* Ribbon trên nắp */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-yellow-300 to-yellow-400" />

                        {/* Nơ trên nắp */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                {/* Nơ trái */}
                                <div className="absolute -left-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform -rotate-45 shadow-lg" />
                                {/* Nơ phải */}
                                <div className="absolute -right-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform rotate-45 shadow-lg" />
                                {/* Tâm nơ */}
                                <div className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg z-10" />
                            </div>
                        </div>

                        {/* Hiệu ứng ánh sáng nắp */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-lg pointer-events-none" />
                    </motion.div>
                </div>

                {/* Bóng đổ */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-8 bg-black/20 rounded-full blur-xl" />
            </div>

            {/* Text hướng dẫn */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white mt-12 text-2xl font-bold drop-shadow-lg"
            >
                {opened ? "🎊 Bất ngờ chưa!" : "👆 Nhấn để mở quà"}
            </motion.p>

            {/* Hiệu ứng confetti khi mở */}
            {opened && (
                <div className="fixed inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: "50vw",
                                y: "50vh",
                                scale: 0,
                                rotate: 0,
                            }}
                            animate={{
                                x: `${Math.random() * 100}vw`,
                                y: `${Math.random() * 100}vh`,
                                scale: [0, 1, 0.8],
                                rotate: Math.random() * 360,
                            }}
                            transition={{
                                duration: 1.5,
                                delay: Math.random() * 0.3,
                                ease: "easeOut",
                            }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a8e6cf", "#ff8b94"][Math.floor(Math.random() * 5)],
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default BoxDetail
