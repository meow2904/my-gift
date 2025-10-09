import {ReactNode} from "react";

const FullLayout = ({ children }: {children: ReactNode}) => {
    return (
        <div className="w-screen h-screen relative font-medium">
            <main className="min-h-screen">
                {children}
            </main>
        </div>

    )
}
export default FullLayout;