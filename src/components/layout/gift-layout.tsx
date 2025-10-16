import {ReactNode} from "react";
import {FloatingProfile} from "@/components/ui/my-profile";

const FullLayout = ({ children }: {children: ReactNode}) => {
    return (
        <div className="w-screen h-screen relative font-medium">
            <main className="min-h-screen">
                {children}
                <FloatingProfile/>
            </main>
        </div>

    )
}
export default FullLayout;