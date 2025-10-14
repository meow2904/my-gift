"use client"

import {useParams} from "next/navigation";
import {useCallback, useEffect} from "react";
import toast from "react-hot-toast";

import {motion, useAnimation} from "framer-motion"
import {useState} from "react"


const BoxDetail: React.FC = () => {
    const params = useParams();
    const id = params.id as string;

    // const getData = useCallback(async () => {
    //     try {
    //         const response = await fetch(`/api/link?id=${id}`);
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             toast.error(errorData.error || 'Gift not found');
    //         }
    //         const data = await response.json();
    //         console.log({data});
    //     }
    //     finally {
    //
    //     }
    // }, [])
    //
    // useEffect( () => {
    //     getData()
    // }, []);

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

        // Hiển thị thông điệp từ trong hộp
        messageControls.start({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {duration: 0.6, delay: 0.2},
        })
    }

    const icons = ["🎂", "😊", "💖", "⭐", "🧁", "🥰", "🎉", "🎈", "🍰", "✨", "💝", "🌟", "🎁", "🍭", "🦄"]
    const randomIcons = Array.from({ length: 25 }, (_, i) => ({
        icon: icons[Math.floor(Math.random() * icons.length)],
        top: `${Math.random() * 85 + 5}%`,
        left: `${Math.random() * 85 + 5}%`,
        rotation: Math.random() * 360 - 180, // Random rotation between -180 and 180 degrees
    }))

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
            <div className="relative cursor-pointer" style={{perspective: "1000px"}} onClick={handleClick}>
                {/* Container 3D */}
                {/*<div className="relative" style={{transformStyle: "preserve-3d"}}>*/}
                <div className="relative" >
                    {/* Thân hộp */}
                    <div
                        className="w-64 h-56 bg-gradient-to-br from-red-500 to-red-600 rounded-lg
                            shadow-2xl relative overflow-hidden"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(0px)",
                        }}
                    >

                        {randomIcons.map((item, i) => (
                            <div
                                key={i}
                                className="absolute text-xl"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    transform: `rotate(${item.rotation}deg)`,
                                }}
                            >
                                {item.icon}
                            </div>
                        ))}

                        {/* Ribbon dọc */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-yellow-300 to-yellow-400 shadow-lg"/>

                        {/* Ribbon ngang */}
                        <div
                            className="absolute top-1/3 -translate-y-1/2 left-0 w-full h-6 bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-lg"/>

                        {/* Thông điệp bên trong */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={messageControls}
                            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6"
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl text-center">
                                <div className="text-6xl mb-4">🎁</div>
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                                    Chúc Mừng!
                                </h2>
                                <p className="text-gray-700 text-lg">Đéo có gì cả! 🎉</p>
                            </div>
                        </motion.div>

                        {/* Hiệu ứng ánh sáng */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"/>
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
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-yellow-300 to-yellow-400"/>

                        {/* Nơ trên nắp */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                {/* Nơ trái */}
                                <div
                                    className="absolute -left-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform -rotate-45 shadow-lg"/>
                                {/* Nơ phải */}
                                <div
                                    className="absolute -right-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform rotate-45 shadow-lg"/>
                                {/* Tâm nơ */}
                                <div
                                    className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg z-10"/>
                            </div>
                        </div>

                        {/* Hiệu ứng ánh sáng nắp */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-lg pointer-events-none"/>
                    </motion.div>
                </div>

                {/* Bóng đổ */}
                <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-8 bg-black/20 rounded-full blur-xl"/>
            </div>

            {/* Text hướng dẫn */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5}}
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