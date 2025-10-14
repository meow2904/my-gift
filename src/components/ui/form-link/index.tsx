"use client"


import {type DragEvent, type ChangeEvent, useCallback, FormEvent, useEffect} from "react"

import {useRef, useState} from "react"
import {X, Upload, Heart, Sparkles, ImageIcon, Rocket} from "lucide-react"
import LinkShare from "../share-link";
import toast from "react-hot-toast";
import {UploadedFile} from "@/types/file-upload/upload";
import {Loading} from "../loading";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card } from "@/components/ui/card"

export default function GiftFormUpload() {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [link, setLink] = useState('');
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFiles(droppedFiles)
    }, [])

    const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            handleFiles(selectedFiles)
        }
    }, [])

    const handleFiles = useCallback((newFiles: File[]) => {
        const imageFiles = newFiles.filter((file) => file.type.startsWith("image/"))

        const uploadedFiles: UploadedFile[] = imageFiles.map((file) => ({
            id: Math.random().toString(36).substring(7),
            file,
            preview: URL.createObjectURL(file),
        }))

        setFiles((prev) => [...prev, ...uploadedFiles])
    }, [])

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === id)
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
            return prev.filter((f) => f.id !== id)
        })
    }, [])

    const handleClick = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleCreateLink = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            files.forEach(({file}) => {
                const ext = file.name.split('.').pop(); // lấy phần mở rộng
                const now = new Date();

                // format thành yyyymmddhhmmss
                const formattedTime = now
                    .toISOString()
                    .replace(/[-:TZ]/g, '') // bỏ ký tự thừa
                    .slice(0, 14); // lấy 14 ký tự đầu → yyyyMMddHHmmss

                const randomSuffix = Math.random().toString(36).substring(2, 6); // 4 ký tự random
                const newFileName = `${formattedTime}_${randomSuffix}.${ext}`;

                formData.append('files', file, newFileName);
            });

            const uploadRes = await fetch('/api/upload',
                {
                    method: 'POST',
                    body: formData
                });
            if (!uploadRes.ok) {
                toast.error("Upload fail")
                return
            }
            const {urls} = await uploadRes.json();

            // Lưu thông tin vào KV
            const linkRes = await fetch('/api/link', {
                method: 'POST',
                body: JSON.stringify({name, message, imageUrls: urls}),
                headers: {'Content-Type': 'application/json'},
            });
            if (!linkRes.ok) {
                toast.error("Create gift fail")
                return
            }

            const dataLink = await linkRes.json();
            setLink(dataLink.link);
        } catch (err: any) {
            toast.error("Có lỗi gì đó đã xảy ra ")
        } finally {
            setLoading(false);
        }
    }

    const validate = () => {
        if (files.length === 0) {
            toast.error("Hãy tải lên ít nhất một file ảnh!")
            return false;
        }
        if (name.length === 0)
        {
            toast.error("Hãy nhập tên của bạn!")
            return false;
        }
        if (message.length === 0)
        {
            toast.error("Hãy nhắn gửi gì đó!")
            return false;
        }
        return true;
    }

    const handleRecreateLink = useCallback(() => {
        setFiles([])
        setName("")
        setMessage("")
        setLink("")
    }, [])

    useEffect(() => {
        return () => {
            files.forEach(f => URL.revokeObjectURL(f.preview));
        };
    }, [files]);

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-10 left-10 float">
                <Heart className="w-12 h-12 text-purple-300/50" fill="currentColor" />
            </div>
            <div className="absolute top-20 right-20 text-secondary/20 float" style={{ animationDelay: "1s" }}>
                <Sparkles className="w-16 h-16 text-gray-200" />
            </div>
            <div className="absolute bottom-20 left-20 text-fuchsia-300/20 float" style={{ animationDelay: "2s" }}>
                <Heart className="w-10 h-10" fill="currentColor" />
            </div>
            <div className="absolute bottom-32 right-32 text-yellow-300 sparkle">
                <Sparkles className="w-8 h-8" />
            </div>

            {
                link.length == 0 && (
                    <form onSubmit={handleCreateLink}
                          className="w-full max-w-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm bg-card/95  rounded-3xl bg-pink-50/50">
                        <div className="space-y-8">
                            {/* Header */}
                            <div className="text-center space-y-3">
                                <h1 className="text-4xl text-balance font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">Tải
                                    ảnh lên nào! 🎀</h1>
                                <p className="text-muted-foreground text-lg">Chia sẻ khoảnh khắc đáng yêu.</p>
                            </div>

                            {/* Drop Zone */}
                            <div
                                onClick={handleClick}
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                                ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-accent/50'
                                }`}
                            >
                                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInput}
                                       className="hidden"/>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Upload className="w-8 h-8 text-primary"/>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Kéo thả ảnh vào đây hoặc click để chọn</p>
                                        <p className="text-xs text-muted-foreground">Hỗ trợ nhiều file ảnh (PNG, JPG, GIF,
                                            WebP)</p>
                                    </div>
                                </div>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Đã tải lên ({files.length} file)</h3>
                                    <div className="space-y-2">
                                        {files.map((uploadedFile) => (
                                            <div
                                                key={uploadedFile.id}
                                                className="flex items-center gap-3 p-2 rounded-lg shadow-md bg-card hover:bg-accent/50 transition-colors"
                                            >
                                                {/* Preview Thumbnail */}
                                                <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-muted">
                                                    <img
                                                        src={uploadedFile.preview || "/placeholder.svg"}
                                                        alt={uploadedFile.file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* File Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{(uploadedFile.file.size / 1024).toFixed(2)} KB</p>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFile(uploadedFile.id)}
                                                    className="flex-shrink-0 p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive hover:cursor-pointer transition-colors"
                                                    aria-label="Xóa file"
                                                >
                                                    <X className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Name Input */}
                            <div className="space-y-3">
                                <label htmlFor={"name"}
                                       className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-pink-400"/>
                                    Tên của bạn
                                </label>
                                <input
                                    id={"name"}
                                    placeholder="Nhập tên của bạn"
                                    value={name}
                                    onChange={(e: any) => setName(e.target.value)}
                                    className="w-full p-3 text-base bg-muted/50 border-1 focus:border-primary rounded-2xl h-12"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="space-y-3">
                                <label htmlFor={"message"}
                                       className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-pink-400" fill="currentColor"/>
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
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center ">
                                <button type="submit"
                                        disabled={loading}
                                        className={`md:w-1/3 rounded-2xl text-base font-semibold h-14 bg-gradient-to-r
                                         from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all
                                         flex items-center justify-center gap-2 border-1 border-pink-300  
                                         ${loading ? '' : 'hover:cursor-pointer'}`}
                                    >

                                    {
                                        loading ? (
                                        <Loading variant="dots" size="sm" text="Đang tạo..."/>
                                    ) : (
                                        <>
                                            Chia sẻ
                                            <Rocket className="w-4 h-4 text-red-400/50" fill="currentColor"/>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )
            }

            {/* Share link */}
            {
                link.length > 0 && (
                    <LinkShare
                        link={link}
                        onRegenerate={handleRecreateLink}
                    ></LinkShare>

                )
            }

        </div>
    )
}
