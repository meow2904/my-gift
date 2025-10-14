'use client';


import {ReactNode} from "react";
import {I18nProvider} from "@/providers/i18-provider";
import {ToasterProvider} from "@/providers/toaster-provider";

export function AppProvider({ children }: { children: ReactNode }) {
    return (
        <I18nProvider>
            <ToasterProvider />
            {children}
        </I18nProvider>
    );
}
