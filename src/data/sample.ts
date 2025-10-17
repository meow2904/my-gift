// src/data/images.ts

export interface ImageData {
    url: string
    title: string
    subtitle: string
}

export const giftTemplates: ImageData[] = [
    {
        url: "/testpic/cute-cat-with-pink-bow.jpg",
        title: "Tỏa sáng như nắng mai ☀️",
        subtitle: "Chúc bạn luôn rạng rỡ và ngọt ngào mỗi ngày",
    },
    {
        url: "/testpic/cute-puppy-with-heart.jpg",
        title: "Xinh như hoa, ngọt như kẹo 🍬",
        subtitle: "Chúc bạn luôn vui vẻ và tràn đầy yêu thương!",
    },
    {
        url: "/testpic/cute-bunny-with-flowers.jpg",
        title: "Ngày của những thiên thần nhỏ 🪽",
        subtitle: "Chúc bạn mãi dễ thương, hồn nhiên và hạnh phúc!",
    },
    {
        url: "/testpic/cute-bear-with-balloon.jpg",
        title: "Bạn là bông hoa đẹp nhất 🌹",
        subtitle: "Tỏa hương và lan tỏa niềm vui đến mọi người!",
    },
    {
        url: "/testpic/cute-hamster-eating.jpg",
        title: "Cười thật tươi nhé 😘",
        subtitle: "Vì bạn xứng đáng với những điều tuyệt vời nhất!",
    },
    {
        url: "/testpic/sparkle-star.jpg",
        title: "Tỏa sáng theo cách riêng của bạn ✨",
        subtitle: "Không ai giống bạn — và đó là điều kỳ diệu!",
    },
    {
        url: "/testpic/sweet-fox.jpg",
        title: "Ngày đặc biệt cho người đặc biệt 💕",
        subtitle: "Chúc bạn luôn xinh, luôn yêu đời, và luôn được yêu!",
    },
    {
        url: "/testpic/lovely-panda.jpg",
        title: "Ngọt ngào như mật ong 🍯",
        subtitle: "Chúc bạn một ngày tràn ngập niềm vui và tiếng cười!",
    },
    {
        url: "/testpic/cute-bear-with-gift.jpg",
        title: "Một món quà nhỏ cho nụ cười to 🎁",
        subtitle: "Chúc bạn luôn hạnh phúc, yêu đời và đáng yêu như thế!",
    },
    {
        url: "/testpic/rose-charm.jpg",
        title: "Đẹp tựa đóa hoa hồng 🌸",
        subtitle: "Mong mỗi ngày đều là ngày tuyệt vời của bạn!",
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
