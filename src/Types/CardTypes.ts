export type CardData = {
    title: string;
    subtitle?: string;
    description?: string;
    phone: string;
    email?: string;
    web?: string;
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip?: string;
    };
    image: {
        url: string;
        alt: string;
    };
};