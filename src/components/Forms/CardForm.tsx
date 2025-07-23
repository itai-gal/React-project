import { useState } from "react";

type CardData = {
    title: string;
    subtitle?: string;
    phone: string;
    email: string;
    description?: string;
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

type Props = {
    isEdit?: boolean;
    onSubmit: (data: CardData) => void;
    initialData?: Partial<CardData>;
};

export const CardForm = ({ onSubmit, isEdit, initialData = {} }: Props) => {
    const [formData, setFormData] = useState<CardData>({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        description: initialData.description || "",
        address: {
            state: initialData.address?.state || "",
            country: initialData.address?.country || "",
            city: initialData.address?.city || "",
            street: initialData.address?.street || "",
            houseNumber: initialData.address?.houseNumber || 0,
            zip: initialData.address?.zip || "",
        },
        image: {
            url: initialData.image?.url || "",
            alt: initialData.image?.alt || "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: addressField === "houseNumber" ? +value : value,
                },
            }));
        } else if (name.startsWith("image.")) {
            const imageField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                image: {
                    ...prev.image,
                    [imageField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.title ? "floating" : ""}>
                        Title <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                    <label className={formData.subtitle ? "floating" : ""}>Subtitle</label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.phone ? "floating" : ""}>
                        Phone <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.email ? "floating" : ""}>
                        Email <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.address.country ? "floating" : ""}>
                        Country <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.address.city ? "floating" : ""}>
                        City <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.address.street ? "floating" : ""}>
                        Street <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="number"
                        name="address.houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleChange}
                        required
                    />
                    <label className={formData.address.houseNumber ? "floating" : ""}>
                        House Number <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="image.url"
                        value={formData.image?.url || ""}
                        onChange={handleChange}
                    />
                    <label className={formData.image?.url ? "floating" : ""}>Image URL</label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="image.alt"
                        value={formData.image?.alt || ""}
                        onChange={handleChange}
                    />
                    <label className={formData.image?.alt ? "floating" : ""}>Image Alt</label>
                </div>

                <div className="input-wrapper" style={{ gridColumn: "span 2" }}>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                    />
                    <label className={formData.description ? "floating" : ""}>Description</label>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn submit">
                    {isEdit ? null : <i className="fa fa-plus" />} {isEdit ? "Save Changes" : "Create Card"}
                </button>
            </div>
        </form>
    );
};