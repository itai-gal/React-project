import { useEffect, useState } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Cards/Card";
import { useAuth } from "../Context/AuthContext";
import { Toast } from "../components/Ui/Toast";


type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    phone: string;
    address: string;
    bizNumber: number;
    image: { url: string; alt: string };
    likes: string[];
    user_id: string;
};

export const MyCards = () => {
    const { token, userId, isBiz } = useAuth();
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    useEffect(() => {
        if (!isBiz || !token) return;

        const fetchMyCards = async () => {
            try {
                const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch cards");
                const data = await res.json();
                setCards(data);
            } catch (err) {
                console.error(err);
                setToastType("error");
                setToastMessage("Failed to load cards.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCards();
    }, [token, isBiz]);

    const handleDelete = async (cardId: string) => {
        if (!token) return;
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Delete failed");

            setCards((prev) => prev.filter((c) => c._id !== cardId));
            setToastType("success");
            setToastMessage("Card deleted successfully.");
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to delete card.");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="My Business Cards" />
            {toastMessage && (
                <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage("")} />
            )}
            {loading ? (
                <p>Loading...</p>
            ) : cards.length === 0 ? (
                <p>No cards found.</p>
            ) : (
                <div className="cards-container">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            _id={card._id}
                            title={card.title}
                            subtitle={card.subtitle}
                            phone={card.phone}
                            address={card.address}
                            cardNumber={card.bizNumber}
                            imageUrl={card.image.url}
                            isFavorite={false}
                            isBusiness={card.user_id === userId}
                            isAdmin={false}
                            onEdit={() => console.log("Edit", card._id)}
                            onDelete={() => handleDelete(card._id)}
                        />
                    ))}
                </div>
            )}
        </MainLayout>
    );
};