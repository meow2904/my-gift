import GiftBoxDetail from "@/components/pages/gift-box/gift-box-detail";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Món quà nhỏ",
    description: "Họp quà bí mật :v",
};

export default function GiftPage() {
    return (
        <GiftBoxDetail/>
    );
}
