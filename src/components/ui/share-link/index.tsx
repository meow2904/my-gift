"use client"

import {useState} from "react"
import {Copy, RefreshCw, Check} from "lucide-react"

interface LinkShareProps {
    link: string
    onRegenerate?: () => void
    expire?: number
}

const LinkShare: React.FC<LinkShareProps> = ({
                                                 link,
                                                 onRegenerate,
                                                 expire = 1,
                                             }) => {
    const [shareLink, setShareLink] = useState(link)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }


    return (
        <div className="w-full max-w-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm bg-card/95  rounded-3xl bg-pink-50/50">
            <div className="space-y-6">
                {/* Title */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-2xl mb-4">
                        <span className="text-4xl">🎉</span>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                            Link chia sẻ
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">Sao chép link bên dưới để chia sẻ với
                        bạn bè</p>
                </div>

                {/* Link display */}
                <div className="relative">
                    <div
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200 transition-all hover:border-pink-300">
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm text-muted-foreground mb-1 font-medium">Link của bạn:</p>
                            <a
                                href={shareLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-700 font-mono text-sm md:text-base break-all transition-colors underline decoration-pink-300 hover:decoration-pink-500"
                            >
                                {shareLink}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex-1 h-12 text-base font-semibold
                            bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
                            text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl flex justify-center items-center"
                        disabled={copied}
                    >
                        {copied ? (
                            <>
                                <Check className="mr-2 h-5 w-5"/>
                                Đã sao chép!
                            </>
                        ) : (
                            <>
                                <Copy className="mr-2 h-5 w-5"/>
                                Sao chép link
                            </>
                        )}
                    </button>

                    <button
                        onClick={onRegenerate}
                        className="flex-1 h-12 text-base font-semibold border-2
                            border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 shadow-md
                            hover:shadow-lg transition-all duration-300 rounded-xl bg-transparent flex justify-center items-center "
                    >
                        <RefreshCw className="mr-2 h-5 w-5"/>
                        Tạo lại
                    </button>
                </div>

                {/* Info text */}
                <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">Link này sẽ hết hạn sau {expire} ngày</p>
                </div>
            </div>
        </div>
    )
}

export default LinkShare;
