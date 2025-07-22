import { useState } from "react";

type Props = {
    onSubmit: (data: any) => void;
    initialData?: any;
};

export const CardForm = ({ onSubmit, initialData = {} }: Props) => {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        imageUrl: initialData.image?.Url || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            image: {
                url: formData.imageUrl,
                alt: formData.title,
            },
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
            <button type="submit">{initialData._id ? "Update" : "Create"} Card</button>
        </form>
    );
};