// src/data/images.ts

export interface ImageData {
    url: string
    title: string
    subtitle: string
}

export const giftTemplates: ImageData[] = [
    {
        url: "/carousel/adorable-mouse-with-lavender-purple-flowers.jpg",
        title: "Tỏa sáng như nắng mai ☀️",
        subtitle: "Chúc bạn luôn rạng rỡ và ngọt ngào mỗi ngày",
    },
    {
        url: "/carousel/adorable-mouse-with-small-sunflowers.jpg",
        title: "Xinh như hoa, ngọt như kẹo 🍬",
        subtitle: "Chúc bạn luôn vui vẻ và tràn đầy yêu thương!",
    },
    {
        url: "/carousel/cute-bear-with-balloon.jpg",
        title: "Ngày của những thiên thần nhỏ 🪽",
        subtitle: "Chúc bạn mãi dễ thương, hồn nhiên và hạnh phúc!",
    },
    {
        url: "/carousel/cute-bunny-with-flowers.jpg",
        title: "Bạn là bông hoa đẹp nhất 🌹",
        subtitle: "Tỏa hương và lan tỏa niềm vui đến mọi người!",
    },
    {
        url: "/carousel/cute-cat-with-orchid-flowers-purple.jpg",
        title: "Cười thật tươi nhé 😘",
        subtitle: "Vì bạn xứng đáng với những điều tuyệt vời nhất!",
    },
    {
        url: "/carousel/cute-hamster-eating.jpg",
        title: "Tỏa sáng theo cách riêng của bạn ✨",
        subtitle: "Không ai giống bạn — và đó là điều kỳ diệu!",
    },
    {
        url: "/carousel/flower.png",
        title: "Ngày đặc biệt cho người đặc biệt 💕",
        subtitle: "Chúc bạn luôn xinh, luôn yêu đời, và luôn được yêu!",
    },
    {
        url: "/carousel/sweet-mouse-with-bell-flowers-blue.jpg",
        title: "Ngọt ngào như mật ong 🍯",
        subtitle: "Chúc bạn một ngày tràn ngập niềm vui và tiếng cười!",
    },
    {
        url: "/carousel/sweet-mouse-with-white-roses.jpg",
        title: "Một món quà nhỏ cho nụ cười to 🎁",
        subtitle: "Chúc bạn luôn hạnh phúc, yêu đời và đáng yêu như thế!",
    },
    {
        url: "/carousel/adorable-cat-with-purple-tulips-flowers.jpg",
        title: "Đẹp tựa đóa hoa hồng 🌸",
        subtitle: "Mong mỗi ngày đều là ngày tuyệt vời của bạn!",
    },
]

export const messageTemp = `
        🌸 Nhân ngày 20/10, xin gửi lời chúc tốt đẹp nhất tới toàn thể chị em phụ nữ!
        Chúc các chị em luôn xinh đẹp, tự tin, hạnh phúc và tràn đầy năng lượng tích cực mỗi ngày 💕
        Các bạn chính là những bông hoa tuyệt vời nhất mà cuộc đời đã ban tặng cho thế giới này 🌷
        Cảm ơn vì luôn mang đến niềm vui, yêu thương và sự ấm áp cho mọi người xung quanh 🌼
          `;

// export function generateGiftImages(uploadedUrls: string[]): ImageData[] {
//     if (uploadedUrls.length === 0)
//         return giftTemplates;
//
//     const shuffledTemplates = [...giftTemplates].sort(() => Math.random() - 0.5);
//
//     return uploadedUrls.map((url, index) => {
//         const template = shuffledTemplates[index];
//
//         // Nếu số ảnh > số template → trả về rỗng
//         if (!template) {
//             return {
//                 url,
//                 title: "",
//                 subtitle: "",
//             };
//         }
//
//         return {
//             url,
//             title: template.title,
//             subtitle: template.subtitle,
//         };
//     });
// }


export function generateGiftImages(uploadedUrls: string[]): ImageData[] {
    // Nếu không có ảnh upload → trả về template mặc định
    if (uploadedUrls.length === 0) return giftTemplates;

    // 1️⃣ Sao chép và xáo trộn danh sách mẫu
    const shuffledTemplates = [...giftTemplates].sort(() => Math.random() - 0.5);

    // 2️⃣ Lấy ngẫu nhiên 2 mẫu đầu tiên
    const randomTemplates = shuffledTemplates.slice(0, 2);

    // 3️⃣ Ghép hai ảnh mẫu vào đầu danh sách ảnh người dùng
    const combinedList = [
        ...randomTemplates.map((t) => ({
            url: t.url,
            title: t.title,
            subtitle: t.subtitle,
        })),
        ...uploadedUrls.map((url, index) => {
            // Có thể lấy ngẫu nhiên title/subtitle tương ứng
            const template = shuffledTemplates[index + 2]; // dịch sang sau 2 ảnh đầu
            return {
                url,
                title: template?.title ?? "",
                subtitle: template?.subtitle ?? "",
            };
        }),
    ];

    return combinedList;
}
