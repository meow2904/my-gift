"use client"

import {useParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";

import {motion, useAnimation} from "framer-motion"
import {ImageCarousel} from "@/components/ui/cute-carousel";
import {generateGiftImages, giftTemplates, messageTemp} from "@/data/sample";
import MessageCard from "@/components/ui/message-detail";
import {ImageData} from "@/data/sample";

const BoxDetail: React.FC = () => {
    const [signature, setSignature] = useState("No name")
    const [messageText, setMessageText] = useState(messageTemp)
    const [title, setTitle] = useState("💐 Day 20/10")
    const [subTitle, setSubTitle] = useState("Gửi đến em - người con gái tuyệt vời nhất")
    const [imageMessage, setImageMessage] = useState<ImageData[]>(giftTemplates)
    const params = useParams();
    const id = params.id as string;
    const getData = useCallback(async () => {
        const response = await fetch(`/api/link?id=${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error || 'Gift not found');
        }
        const data = await response.json();
        setSignature(data.name);
        setMessageText(data.message);
        setImageMessage(generateGiftImages(data.imageUrls))
    }, [])

    useEffect(() => {
        getData()
    }, []);

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
            transition: {duration: 0.6, delay: 0.2},
        })
    }
    // Danh sách icon và vị trí cố định
    const fixedIcons = [
        {icon: "🎂", top: "50%", left: "25%", rotation: -10},
        {icon: "😊", top: "39%", left: "60%", rotation: 5},
        {icon: "💖", top: "50%", left: "70%", rotation: 0},
        {icon: "⭐", top: "60%", left: "20%", rotation: 15},
        {icon: "🧁", top: "70%", left: "58%", rotation: -20},
        {icon: "🎉", top: "45%", left: "85%", rotation: 10},
        {icon: "🥰", top: "85%", left: "31%", rotation: -15},
        {icon: "🍰", top: "65%", left: "9%", rotation: -15},
        {icon: "✨", top: "37%", left: "10%", rotation: -15},
        {icon: "💝", top: "85%", left: "12%", rotation: -15},
        {icon: "🌟", top: "85%", left: "85%", rotation: -15},
        {icon: "🎁", top: "65%", left: "35%", rotation: -15},
        {icon: "🍭", top: "65%", left: "90%", rotation: -15},
        {icon: "🦄", top: "75%", left: "75%", rotation: -15},
    ]

    const loveCard = (
        <MessageCard
            title={title}
            subtitle={subTitle}
            message={messageText}
            signature={signature}
        />
    );

    return (
        <div
            className="h-screen overflow-hidden over flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
            <div className="relative cursor-pointer mt-12" style={{perspective: "1000px"}} onClick={handleClick}>
                <div className="relative">
                    {/* Thân hộp */}
                    <div
                        className="w-48 h-44 md:w-64 md:h-56 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-2xl relative overflow-hidden "
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

                        {/* Hiệu ứng ánh sáng */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"/>
                    </div>

                    {/* Nắp hộp */}
                    <motion.div
                        animate={lidControls}
                        className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-t-lg shadow-2xl"
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
                                <div
                                    className="absolute -left-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform -rotate-45 shadow-lg"/>
                                <div
                                    className="absolute -right-8 top-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform rotate-45 shadow-lg"/>
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
                {opened ? "🎊 Hẹ hẹ hẹ ... !" : "👆 Nhấn để mở quà"}
            </motion.p>

            <motion.div
                initial={{opacity: 0, y: 20, scale: 0.8}}
                animate={messageControls}
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${
                    opened ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{width: "500px", height: "700px"}}
            >
                <div className="w-full h-full flex items-start justify-center">
                    <ImageCarousel images={imageMessage} finalContent={loveCard}/>
                    {/*<ImageCarousel images={giftTemplates} finalContent={loveCard}/>*/}
                </div>
            </motion.div>

            {/* Hiệu ứng confetti khi mở */}
            {opened && (
                <div className="fixed inset-0  pointer-events-none">
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