import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import FullLayout from "@/components/layout/gift-layout";
import {AppProvider} from "@/providers/app-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Món quà nhỏ của anh",
    description: "Yêu thương!",
    icons : [
        "/ico/gift.png",
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AppProvider>
                    <FullLayout>
                        {children}
                    </FullLayout>
                </AppProvider>
            </body>
        </html>
    );
}
