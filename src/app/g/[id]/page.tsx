import GiftBoxDetail from "@/components/pages/gift-box/gift-box-detail";
import type {Metadata} from "next";
import FullLayout from "@/components/layout/gift-layout";


export const metadata: Metadata = {
    title: "Litebox 😊",
    description: "Họp quà bí mật :v",
};

export default function GiftPage() {
    return (
        <FullLayout>
            <GiftBoxDetail/>
        </FullLayout>
    );
}
