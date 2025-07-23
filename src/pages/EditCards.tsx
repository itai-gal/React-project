import { useEffect, useState } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader"
import { MainLayout } from "../layouts/MainLayout"
import { useNavigate, useParams } from "react-router";
import { getToken } from "../utils/api";
import { CardForm } from "../components/Forms/CardForm";
import { useAuth } from "../Context/AuthContext";
import type { CardData } from "../Types/CardTypes";

export const EditCards = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { role, isLoggedIn } = useAuth();

    const [card, setCard] = useState<CardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn || (role !== "business" && role !== "admin")) {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

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
                const formattedCard: CardData = {
                    title: data.title,
                    subtitle: data.subtitle,
                    description: data.description,
                    phone: data.phone,
                    email: data.email,
                    web: data.web,
                    address: {
                        country: data.address.country,
                        city: data.address.city,
                        street: data.address.street,
                        houseNumber: data.address.houseNumber,
                        zip: data.address.zip?.toString(),
                        state: data.address.state,
                    },
                    image: {
                        url: data.image.url,
                        alt: data.image.alt,
                    },
                };

                setCard(formattedCard);
            } catch (err) {
                console.error("Error loading card:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    const handleUpdate = async (updatedData: CardData) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                    "x-auth-token": getToken() as any
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error("Failed to update card");

            const result = await res.json();
            navigate("/Cards");
        } catch (err) {
            alert("Error updating card");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Edit Card" />
            {loading ? (
                <p>Loading...</p>
            ) : card ? (
                <CardForm onSubmit={handleUpdate} initialData={card} isEdit={true} />
            ) : (
                <p>Card not found.</p>
            )}
        </MainLayout>
    );
};