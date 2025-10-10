"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Heart, Sparkles, ImageIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card } from "@/components/ui/card"

export default function GiftPageUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setUploadedFile(file)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setUploadedFile(file)
        }
    }

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative floating elements */}
            {/*<div className="absolute top-10 left-10 text-primary/20 float">*/}
            {/*    <Heart className="w-12 h-12" fill="currentColor" />*/}
            {/*</div>*/}
            {/*<div className="absolute top-20 right-20 text-secondary/20 float" style={{ animationDelay: "1s" }}>*/}
            {/*    <Sparkles className="w-16 h-16" />*/}
            {/*</div>*/}
            {/*<div className="absolute bottom-20 left-20 text-accent/20 float" style={{ animationDelay: "2s" }}>*/}
            {/*    <Heart className="w-10 h-10" fill="currentColor" />*/}
            {/*</div>*/}
            {/*<div className="absolute bottom-32 right-32 text-primary/20 sparkle">*/}
            {/*    <Sparkles className="w-8 h-8" />*/}
            {/*</div>*/}

            <form className="w-full max-w-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm bg-card/95  rounded-3xl bg-pink-50/50">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-bold text-foreground text-balance">Tải ảnh lên nào! 🎀</h1>
                        <p className="text-muted-foreground text-lg">Chia sẻ khoảnh khắc đáng yêu.</p>
                    </div>

                    {/* Upload Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-4 border-dashed rounded-3xl p-12 transition-all duration-300 ${
                            isDragging
                                ? "border-primary bg-primary/5 scale-105"
                                : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                    >
                        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/*" multiple={true} />
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                                <div className="relative bg-gradient-to-br from-primary to-secondary p-6 rounded-full shadow-lg">
                                    <Upload className="w-12 h-12 text-primary-foreground" />
                                </div>
                            </div>
                            {uploadedFile ? (
                                <div className="text-center space-y-2">
                                    <p className="text-xl font-semibold text-primary">✨ {uploadedFile.name}</p>
                                    <p className="text-sm text-muted-foreground">Nhấn để chọn ảnh khác</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <p className="text-xl font-semibold text-foreground">Kéo thả ảnh vào đây</p>
                                    <p className="text-sm text-muted-foreground">hoặc nhấn để chọn từ thiết bị 💝</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-400" />
                            Tên của bạn
                        </label>
                        <input
                            placeholder="Nhập tên của bạn"
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                            className="w-full p-3 text-base bg-muted/50 border-1 focus:border-primary rounded-2xl h-12"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                            Lời nhắn của bạn
                        </label>
                        <textarea
                            id="message"
                            placeholder="Viết điều gì đó thật đáng yêu... 🌸"
                            value={message}
                            onChange={(e: any) => setMessage(e.target.value)}
                            className="min-h-[120px] w-full p-3 resize-none text-base bg-muted/50 border-1 focus:border-primary rounded-2xl"
                        />
                    </div>



                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            className="flex-1 rounded-2xl text-base font-semibold h-14 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Tạo quà tặng
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
