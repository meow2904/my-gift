'use client'

import { useState, useEffect, useRef } from 'react';

export default function ChristmasLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const starFieldRef = useRef<HTMLDivElement>(null);
    const hasAttemptedPlay = useRef(false);

    const lyrics = [
        "Gửi em, Phương Thủy,",
        "Giáng Sinh đến rồi,",
        "ngoài kia chắc cũng đang rất rộn ràng.",
        "Anh muốn viết vài dòng nhỏ gửi em.",
        "Dù tụi mình mới quen nhau chưa lâu,",
        "nhưng anh thấy vui vì có dịp được trò chuyện cùng em.",
        "Ấn tượng của anh về em",
        "là một cô gái rất dễ thương.",
        "Mùa Noel này,",
        "anh gửi đến em một chút hơi ấm nho nhỏ 🧣",
        "không phải món quà gì đặc biệt,",
        "chỉ là chiếc khăn quàng",
        "và một tấm thiệp online,",
        "như một lời chúc chân thành.",
        "Chúc em có một mùa Giáng Sinh thật bình yên,",
        "ăn nhiều món ngon,",
        "và luôn giữ nụ cười tươi nhé ✨",
        "Hy vọng thời gian tới,",
        "tụi mình sẽ còn nói chuyện với nhau nhiều hơn.",
        "Merry Christmas! 🎅"
    ];


    // Create stars only once
    useEffect(() => {
        const starField = starFieldRef.current;
        if (starField && starField.children.length === 0) {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}vw`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.animationDuration = `${2 + Math.random() * 3}s`;
                fragment.appendChild(star);
            }
            starField.appendChild(fragment);
        }
    }, []);

    // Auto-play audio when component mounts
    useEffect(() => {
        if (!hasAttemptedPlay.current) {
            hasAttemptedPlay.current = true;

            const playAudio = () => {
                if (!audioRef.current) {
                    audioRef.current = new Audio('/bg-music/nhac.mp3');
                    audioRef.current.volume = 0.5;
                    audioRef.current.loop = true;
                }

                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(e => {
                        console.log('Auto-play blocked. User interaction needed.');
                        setIsPlaying(false);
                    });
            };

            // Try to play immediately
            playAudio();

            // If blocked, play on first user interaction
            const handleInteraction = () => {
                playAudio();
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
            };

            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction);

            return () => {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
            };
        }
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        setCurrentPage(0);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setCurrentPage(0), 600);
    };

    const nextPage = () => {
        if (isOpen) {
            setCurrentPage(prev => (prev + 1) % lyrics.length);
        }
    };

    const toggleAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/bg-music/nhac.mp3');
            audioRef.current.volume = 0.5;
            audioRef.current.loop = true;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        setIsPlaying(!isPlaying);
    };

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;600&display=swap');

                * { box-sizing: border-box; }

                body {
                    background: radial-gradient(circle at top, #1f1f41, #18101b 80%);
                    margin: 0;
                    min-height: 100vh;
                    overflow: hidden;
                    font-family: 'Poppins', sans-serif;
                }

                .star-field {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .star {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0;
                    animation: twinkle 2s infinite ease-in-out;
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.5); }
                }

                .santa {
                    position: fixed;
                    bottom: 5%;
                    right: -400px;
                    width: 400px;
                    animation: flySanta 12s linear infinite;
                    z-index: 9999;
                    pointer-events: none;
                }

                @keyframes flySanta {
                    to { transform: translateX(-150vw); }
                }

                .envelope-wrapper {
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                .flap {
                    transition: transform 0.4s ease;
                }

                .flap.open {
                    transform: rotateX(180deg);
                    z-index: 1;
                }

                .flap.close {
                    transform: rotateX(0);
                    transition: transform 0.4s 0.5s ease;
                    z-index: 5;
                }

                .letter {
                    transition: transform 0.4s ease;
                }

                .letter.open {
                    transform: translateY(-100px) rotate(-3deg);
                    transition: transform 0.4s 0.4s ease;
                    z-index: 2;
                }

                .letter.close {
                    transform: translateY(0);
                    z-index: 1;
                }

                .heart {
                    position: relative;
                    width: 50px;
                    height: 50px;
                }

                .heart:before,
                .heart:after {
                    content: "";
                    position: absolute;
                    left: 25px;
                    top: 0;
                    width: 25px;
                    height: 40px;
                    background: #ff0000;
                    border-radius: 25px 25px 0 0;
                    transform: rotate(-45deg);
                    transform-origin: 0 100%;
                }

                .heart:after {
                    left: 0;
                    transform: rotate(45deg);
                    transform-origin: 100% 100%;
                }

                .hearts .heart.a1 {
                    animation: slideUp 4s linear infinite, sideSway 2s ease-in-out infinite alternate;
                    transform: scale(0.6);
                }

                .hearts .heart.a2 {
                    animation: slideUp 5s linear infinite, sideSway 4s ease-in-out infinite alternate;
                }

                .hearts .heart.a3 {
                    animation: slideUp 7s linear infinite, sideSway 2s ease-in-out infinite alternate;
                    transform: scale(0.8);
                }

                @keyframes slideUp {
                    to { top: -600px; }
                }

                @keyframes sideSway {
                    0%, 100% { margin-left: 0; }
                    50% { margin-left: 50px; }
                }

                .sparkle {
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 0;
                    pointer-events: none;
                }

                .sparkle.s1 { animation: sparkleUp 3s linear infinite; }
                .sparkle.s2 { animation: sparkleUp 4s linear infinite; }
                .sparkle.s3 { animation: sparkleUp 5s linear infinite; }

                @keyframes sparkleUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-500px) rotate(360deg); opacity: 0; }
                }

                .audio-button {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(196, 30, 58, 0.9);
                    border: 3px solid #ffd700;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .audio-button:hover {
                    transform: scale(1.1);
                    background: rgba(196, 30, 58, 1);
                }

                .audio-button:active {
                    transform: scale(0.95);
                }

                @media (max-width: 768px) {
                    .santa {
                        width: 200px;
                        right: -200px;
                        bottom: 10%;
                    }

                    .envelope-wrapper {
                        transform: scale(0.7) !important;
                        margin-top: -80px !important;
                    }

                    .audio-button {
                        width: 56px;
                        height: 56px;
                        font-size: 22px;
                        top: 15px;
                        right: 15px;
                    }

                    .main-container {
                        padding-top: 60px;
                    }

                    .control-section {
                        margin-top: 0 !important;
                        transform: scale(0.9);
                    }
                }

                @media (max-width: 480px) {
                    .envelope-wrapper {
                        transform: scale(0.6) !important;
                        margin-top: -100px !important;
                    }

                    .audio-button {
                        width: 50px;
                        height: 50px;
                        font-size: 20px;
                        top: 12px;
                        right: 12px;
                    }
                }
            `}</style>

            <div ref={starFieldRef} className="star-field" />

            <button
                onClick={toggleAudio}
                className="audio-button"
                title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
            >
                {isPlaying ? '🔊' : '🔇'}
            </button>

            <img
                src="https://i.pinimg.com/originals/7f/1f/76/7f1f76ac29bc01ad318abbf0468b1062.gif"
                className="santa"
                alt="Santa flying"
            />

            <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
                <div className="envelope-wrapper h-96 mt-12">
                    <div
                        className={`relative w-96 h-60 rounded-b-lg mx-auto top-36 ${isOpen ? 'cursor-pointer' : ''}`}
                        onClick={isOpen ? nextPage : undefined}
                    >
                        {/* Background */}
                        <div className="absolute bg-red-500 w-[98%] left-[1%] h-[75%] top-0 rounded-xl shadow-lg" style={{ zIndex: -5 }} />

                        {/* Flap */}
                        <div
                            className={`absolute w-0 h-0 border-l-[190px] border-r-[190px] border-t-[150px] border-l-transparent border-r-transparent origin-top pointer-events-none flap ${isOpen ? 'open' : 'close'}`}
                            style={{ borderTopColor: '#c41e3a' }}
                        >
                            <div className="absolute top-[-50px] left-[-32px] text-5xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                🎄
                            </div>
                        </div>

                        {/* Pocket */}
                        <div
                            className="absolute w-0 h-0 border-l-[190px] border-r-[190px] border-b-[90px] border-t-[150px] border-t-transparent rounded-b-lg"
                            style={{
                                zIndex: 11,
                                borderLeftColor: '#c41e3a',
                                borderRightColor: '#c41e3a',
                                borderBottomColor: '#a01729'
                            }}
                        />

                        {/* Letter */}
                        <div
                            className={`letter relative w-[95%] mx-auto h-[95%] top-0 rounded-xl shadow-xl p-4 overflow-hidden ${isOpen ? 'open' : 'close'}`}
                            style={{ background: 'linear-gradient(180deg, #ffe8e8 0%, #fff5e6 50%, #ffffff 100%)' }}
                        >
                            {/* Decorative corners */}
                            <div className="absolute w-5 h-5 border-2 rounded top-2.5 left-2.5 border-r-0 border-b-0 z-10" style={{ borderColor: '#c41e3a' }} />
                            <div className="absolute w-5 h-5 border-2 rounded bottom-2.5 right-2.5 border-l-0 border-t-0 z-10" style={{ borderColor: '#c41e3a' }} />

                            {/* Message */}
                            <div className="relative z-20 font-['Pacifico'] text-center leading-relaxed p-1 h-full flex items-center justify-center" style={{ color: '#2d5016' }}>
                                {isOpen && (
                                    <p className="text-2xl transition-opacity duration-500 px-4">
                                        {lyrics[currentPage]}
                                    </p>
                                )}
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,250,240,0.3) 100%)' }} />
                        </div>

                        {/* Hearts */}
                        <div className={`hearts absolute top-24 left-0 right-0 z-20 transition-opacity duration-500 ${!isOpen && 'opacity-0'}`}>
                            <div className="heart a1 absolute bottom-0 pointer-events-none" style={{ left: '20%' }} />
                            <div className="heart a2 absolute bottom-0 pointer-events-none" style={{ left: '55%' }} />
                            <div className="heart a3 absolute bottom-0 pointer-events-none" style={{ left: '10%' }} />
                        </div>

                        {/* Sparkles */}
                        <div className={`sparkles absolute top-24 left-0 right-0 z-20 transition-opacity duration-500 ${!isOpen && 'opacity-0'}`}>
                            <div className="sparkle s1" style={{ left: '30%' }} />
                            <div className="sparkle s2" style={{ left: '60%' }} />
                            <div className="sparkle s3" style={{ left: '45%' }} />
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="text-center mt-5 z-20 flex items-center gap-4">
                    <button
                        onClick={isOpen ? handleClose : handleOpen}
                        className="font-semibold bg-gradient-to-br from-red-700 via-red-800 to-green-700 border-2 border-yellow-400 rounded-full text-white px-7 py-3 text-lg cursor-pointer font-['Poppins'] shadow-lg hover:translate-y-[-4px] hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
                        style={{
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 0 10px rgba(255, 215, 0, 0.4)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {isOpen ? 'Đóng' : 'Mở'}
                    </button>
                    <img
                        width={50}
                        height={50}
                        src="/christmas-letter/christmas.gif"
                        alt="Christmas decoration"
                    />
                </div>
            </div>
        </>
    );
}