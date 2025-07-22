import { useEffect, useState } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Cards/Card";
import { getToken } from "../utils/api";
import { useAuth } from "../Context/AuthContext";

type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    phone: string;
    address: string;
    bizNumber: number;
    image: { url: string; alt: string };
    likes: string[];
};

export const Favorites = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const { isBiz, isAdmin, token, userId } = useAuth();

    useEffect(() => {
        if (!userId) return;
        const fetchCards = async () => {
            try {
                const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                const data: CardType[] = await res.json();
                const favoriteCards = data.filter((card) => card.likes.includes(userId));
                setCards(favoriteCards);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [userId]);

    const toggleFavorite = async (cardId: string) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (!res.ok) throw new Error("Toggle favorite failed");

            setCards((prev) =>
                prev.filter((card) => card._id !== cardId)
            );
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Favorites" />
            {loading ? (
                <p>Loading...</p>
            ) : cards.length === 0 ? (
                <p>No cards available.</p>
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