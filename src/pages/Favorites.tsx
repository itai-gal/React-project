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
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
        _id?: string;
    };
    bizNumber: number;
    image: { url: string; alt: string };
    likes: string[];
};

export const Favorites = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const { isBiz, isAdmin, token, userId, isLoggedIn } = useAuth();

    useEffect(() => {
        if (!userId) return;

        const fetchCards = async () => {
            try {
                const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch cards");

                const data: CardType[] = await res.json();
                const favoriteCards = data.filter((card) => card.likes.includes(userId)
                );
                setCards(favoriteCards);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [userId, token]);

    const toggleFavorite = async (cardId: string) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-auth-token": token as any
                },
            });

            if (!res.ok) throw new Error("Toggle favorite failed");

            setCards((prev) => prev.filter((card) => card._id !== cardId));
            setToastType("success");
        } catch (err) {
            console.error("Error toggling favorite:", err);
            setToastType("error");
            setToastMessage("Failed to update favorites.");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Favorites" />
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            {loading ? (
                <p>Loading...</p>
            ) : cards.length === 0 ? (
                <p>No favorite cards yet.</p>
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
                            isFavorite={true}
                            isLoggedIn={isLoggedIn}
                            isBusiness={isBiz}
                            isAdmin={isAdmin}
                            onFavoriteToggle={() => toggleFavorite(card._id)}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        />
                    ))}
                </div>
            )}
        </MainLayout>
    );
};