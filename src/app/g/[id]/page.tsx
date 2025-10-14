"use client"

import { useParams } from 'next/navigation';

export default function GiftPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Trang Gift ID: {id}</h1>
            <p className="text-gray-500 mt-2">
                Đây là nội dung của đường dẫn /g/{id}
            </p>
        </div>
    );
}
