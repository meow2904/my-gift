"use client"

import {useState} from "react"
import {X, User, Facebook, Mail} from "lucide-react"

export function FloatingProfile() {
    const [isOpen, setIsOpen] = useState(false)

    const socialLinks = [
        {icon: Facebook, label: "Facebook", href: "https://www.facebook.com/nguyenhuy.99bn"},
        {icon: Mail, label: "Email", href: "mailto:dinhhuynguyen.99bn@gmail.com"},
    ]

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Popup Card */}
            <div
                className={`absolute bottom-20 right-0 rounded-2xl transition-all duration-300 ease-out 
                  bg-gradient-to-tr from-pink-400 via-pink-300 to-purple-400 
                  ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}`}
            >
                <div className="w-80 p-3 shadow-2xl border-0 ">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                                <User className="w-6 h-6 text-primary-foreground"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Nguyễn Đình Huy</h3>
                                <p className="text-sm text-muted-foreground">Developer - Code Ngu</p>
                            </div>
                        </div>
                        <button className="h-8 w-8 -mt-1 -mr-1 hover:cursor-pointer" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4"/>
                        </button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line text-center">
                        Huy Nguyễn - MeowwMeoww- 1999<br/>Một chiếc developer !!!
                    </p>

                    <div className="space-y-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors group"
                            >
                                <link.icon
                                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"/>
                                <span className="text-sm font-medium">{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-gradient-to-tr from-pink-400 via-pink-300 to-purple-400 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
                    isOpen ? "rotate-90 scale-110" : "hover:scale-110"
                }`}
                aria-label="Toggle profile"
            >
                {isOpen ? (
                    <X className="w-6 h-6 transition-transform"/>
                ) : (
                    <User className="w-6 h-6 transition-transform group-hover:scale-110"/>
                )}
            </button>
        </div>
    )
}
