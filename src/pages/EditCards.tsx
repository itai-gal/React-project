import { useEffect, useState } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader"
import { MainLayout } from "../layouts/MainLayout"
import { useNavigate, useParams } from "react-router";
import { getToken } from "../utils/api";
import { CardForm } from "../components/Forms/CardForm";
import { useAuth } from "../Context/AuthContext";

type Card = {
    title: string;
    subtitle?: string;
    phone: string;
    address: string;
    image: { url: string; alt: string };
};

export const EditCards = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { role, isLoggedIn } = useAuth();

    const [card, setCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn || (role !== "business" && role !== "admin")) {
            navigate("/");
        }
    }, [isLoggedIn, role]);

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

    const handleUpdate = async (updatedData: any) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error("Failed to update card");

            const result = await res.json();
            console.log("Card updated:", result);
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
                <CardForm onSubmit={handleUpdate} initialData={card} />
            ) : (
                <p>Card not found.</p>
            )}
        </MainLayout>
    );
};