import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { getToken } from "../utils/api";
import "./CardDetails.css"

type AddressType = {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id?: string;
};

type Card = {
    _id: string;
    title: string;
    subtitle?: string;
    phone: string;
    address: AddressType;
    bizNumber: number;
    image: { url: string; alt: string };
};

export const CardDetails = () => {
    const { id } = useParams();
    const [card, setCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch card");

                const data = await res.json();
                setCard(data);
            } catch (err) {
                console.error("Error loading card:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    if (loading) return <MainLayout><p>Loading...</p></MainLayout>;
    if (!card) return <MainLayout><p>Card not found.</p></MainLayout>;

    const formattedAddress = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`;
    const googleAddress = encodeURIComponent(formattedAddress);

    return (
        <MainLayout>
            <DynamicPageHeader header={card.title} />
            <div className="card-details">
                <img src={card.image.url} alt={card.image.alt} />
                <div className="card-details-info">
                    {card.subtitle && <h3>{card.subtitle}</h3>}
                    <p><strong>Phone:</strong> {card.phone}</p>
                    <p><strong>Address:</strong> {formattedAddress}</p>
                    <p><strong>Card Number:</strong> {card.bizNumber}</p>
                </div>

                <iframe
                    width="100%"
                    height="450"
                    style={{ border: 0, marginTop: "1rem" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${googleAddress}&output=embed`}
                ></iframe>
            </div>
        </MainLayout>
    );
};