// src/data/images.ts

export interface ImageData {
    url: string
    title: string
    subtitle: string
}

export const giftTemplates: ImageData[] = [
    {
        url: "/testpic/cute-cat-with-pink-bow.jpg",
        title: "Chúc mừng ngày của phái đẹp! 💐",
        subtitle: "Chúc chị em luôn xinh đẹp, tự tin và hạnh phúc mỗi ngày!",
    },
    {
        url: "/testpic/cute-puppy-with-heart.jpg",
        title: "Gửi đến những bông hoa tuyệt vời nhất! 🌸",
        subtitle: "Cảm ơn vì đã làm cho thế giới này trở nên dịu dàng và tươi sáng hơn!",
    },
    {
        url: "/testpic/cute-bunny-with-flowers.jpg",
        title: "Ngày đặc biệt của phái đẹp! 🎀",
        subtitle: "Chúc chị em luôn tràn đầy năng lượng, nụ cười và yêu thương!",
    },
    {
        url: "/testpic/cute-bear-with-balloon.jpg",
        title: "Tôn vinh một nửa thế giới! 🌺",
        subtitle: "Chúc các chị em mãi rạng rỡ, thành công và được yêu thương thật nhiều!",
    },
    {
        url: "/testpic/cute-hamster-eating.jpg",
        title: "Ngày dành riêng cho phái đẹp 💖",
        subtitle: "Chúc chị em luôn vui vẻ, mạnh mẽ và hạnh phúc trong từng khoảnh khắc!",
    },
]

export const messageTemp = `
        Nhân ngày 20/10, anh chúc em luôn xinh đẹp, hạnh phúc và tràn đầy năng lượng tích cực 💐  
        Em chính là món quà tuyệt vời nhất mà cuộc đời đã ban cho anh.  
        Mỗi ngày trôi qua có em, anh thấy mọi thứ đều rực rỡ hơn 🌸  
        Cảm ơn em đã luôn ở bên anh, yêu và hiểu anh hơn bất cứ ai 💕
          `;

export function generateGiftImages(uploadedUrls: string[]): ImageData[] {
    if (uploadedUrls.length === 0)
        return giftTemplates;

    const shuffledTemplates = [...giftTemplates].sort(() => Math.random() - 0.5);

    return uploadedUrls.map((url, index) => {
        const template = shuffledTemplates[index];

        // Nếu số ảnh > số template → trả về rỗng
        if (!template) {
            return {
                url,
                title: "",
                subtitle: "",
            };
        }

        return {
            url,
            title: template.title,
            subtitle: template.subtitle,
        };
    });
}
