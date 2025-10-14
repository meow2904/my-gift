'use client';

import {Toaster} from 'react-hot-toast';

export function ToasterProvider() {
    return <Toaster
        position="top-center"
        toastOptions={
            {
                duration: 2000,
            }
        }
    />;
}
