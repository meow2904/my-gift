// components/LoveMessageCard.tsx
"use client";

import React from "react";

interface MessageCardProps {
    title?: string;
    subtitle?: string;
    message: string;
    signature?: string;
}

const MessageCard: React.FC<MessageCardProps> = ({
                                                             title = "💌 To you  💕",
                                                             subtitle = "",
                                                             message,
                                                             signature = "Với tất cả yêu thương 💖",
                                                         }) => {
    return (
        <>
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-pink-600 drop-shadow-sm">{title}</h2>
                {subtitle && subtitle.length && <p className="text-pink-500 font-medium">{subtitle}</p>}
                <div className="min-h-[200px] text-pink-600 text-sm leading-relaxed text-center bg-white/60 rounded-2xl p-4 shadow-inner">
                    {message.split("\n").map((line, i) => (
                        <p key={i} className="mb-3">
                            {line}
                        </p>
                    ))}
                </div>

                <p className="text-pink-600 font-semibold mt-6">
                    {signature}
                    <br />
                    <span className="text-2xl">💖 ✨ 💕</span>
                </p>
            </div>
        </>

    );
};

export default MessageCard;
