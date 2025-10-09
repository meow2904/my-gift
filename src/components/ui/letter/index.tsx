'use client';
import { motion } from "framer-motion";
import React from "react";
import letterImg from '../../../../public/letter/letter-4027716.jpg';
import Image from 'next/image';


const Letter: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if (!open) {
            const audio = new Audio('/letter/piano-logo.mp3');
            audio.play();
            setOpen(true);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div
                className="relative w-[260px] h-[200px] cursor-pointer"
                onClick={handleOpen}
            >
                {/* Phong bì */}
                <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: open ? 180 : 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="absolute w-full h-full origin-bottom"
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Mặt trước */}
                        <Image
                            src={letterImg}
                            alt="Letter Closed"
                            fill
                            className="backface-hidden inset-0 rounded-lg w-full h-full" // 👈 thêm object-cover
                            priority
                        />


                    {/* Mặt sau (khi mở) */}
                    <div
                        className="absolute inset-0 bg-pink-200 flex items-center justify-center backface-hidden"
                        style={{ transform: 'rotateX(180deg)' }}
                    >
                        <p className="text-pink-700 text-center font-medium px-4">
                            Hhuhuhuhu
                        </p>
                    </div>
                </motion.div>

                {/* Tờ giấy bên trong (chỉ hiện khi mở) */}
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: -30 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-4 text-center w-[220px]">
                            <p className="text-gray-700">
                               Hí hí hí hí
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
export default Letter