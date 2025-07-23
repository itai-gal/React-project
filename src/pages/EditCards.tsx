import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { MainLayout } from "../layouts/MainLayout";
import { CardForm } from "../components/Forms/CardForm";
import { getToken } from "../utils/api";
import { useAuth } from "../Context/AuthContext";
import { useCards } from "../Context/CardsContext";
import { Toast } from "../components/Ui/Toast";
import type { CardData } from "../Types/CardTypes";

export const EditCards = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { role, isLoggedIn } = useAuth();
    const {
        setToastMessage,
        setToastType,
        toastMessage,
        toastType,
        refetchCards,
    } = useCards();

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
                const res = await fetch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch card");

                const data = await res.json();

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
                setToastType("error");
                setToastMessage("Failed to load card.");
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id, setToastMessage, setToastType]);

    const handleUpdate = async (updatedData: CardData) => {
        try {
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                        "x-auth-token": getToken() as any,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!res.ok) throw new Error("Failed to update card");

            await res.json();
            setToastType("success");
            setToastMessage("Card updated successfully.");
            await refetchCards();

            setTimeout(() => navigate("/MyCards"), 1200);
        } catch (err) {
            console.error("Error updating card:", err);
            setToastType("error");
            setToastMessage("Error updating card.");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Edit Card" />

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

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
