import { useEffect, useState } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader"
import { MainLayout } from "../layouts/MainLayout"
import { Card } from "../components/Cards/Card";
import { useAuth } from "../Context/AuthContext";
import { Toast } from "../components/Ui/Toast";
import "./Cards.css"

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


export const Cards = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const { isBiz, isAdmin, token, userId, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                        }
                        : {},
                });
                if (!res.ok) throw new Error("Failed to fetch cards");
                const data = await res.json();
                setCards(data);
            } catch (err) {
                console.error("Error fetching cards:", err);
                setErrorMessage("Failed to load cards. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [token]);

    const toggleFavorite = async (cardId: string) => {
        if (!userId || !token) {
            setToastType("error");
            setToastMessage("You must be logged in to favorite a card.");
            return;
        }

        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Toggle favorite failed");

            setCards((prev) =>
                prev.map((card) =>
                    card._id === cardId
                        ? {
                            ...card,
                            likes: card.likes.includes(userId)
                                ? card.likes.filter((id) => id !== userId)
                                : [...card.likes, userId],
                        }
                        : card
                )
            );
        } catch (err) {
            console.error("Error toggling favorite:", err);
            setToastType("error");
            setToastMessage("Failed to update favorite.");
        }
    };

    const formatAddress = (address: CardType["address"]) =>
        `${address.street} ${address.houseNumber}, ${address.city}, ${address.country}`;

    return (
        <MainLayout>
            <DynamicPageHeader header="All Cards" />

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            {loading ? (
                <p>Loading...</p>
            ) : errorMessage ? (
                <p className="error">{errorMessage}</p>
            ) : cards.length === 0 ? (
                <p>No cards available.</p>
            ) : (
                <div className="cards-container">
                    {cards
                        .slice(0, isLoggedIn ? 120 : 10)
                        .map((card) => (
                            <Card
                                key={card._id}
                                _id={card._id}
                                title={card.title}
                                subtitle={card.subtitle}
                                phone={card.phone}
                                address={formatAddress(card.address)}
                                cardNumber={card.bizNumber}
                                imageUrl={card.image.url}
                                isFavorite={userId ? card.likes.includes(userId) : false}
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