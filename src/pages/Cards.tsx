import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router";
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
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [errorMessage, setErrorMessage] = useState("");

    const { isBiz, isAdmin, token, userId, isLoggedIn } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
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
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-auth-token": token as any
                    },
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Toggle favorite failed: ${text}`);
            }

            setCards((prevCards) =>
                prevCards.map((card) =>
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

            setToastType("success");
            setToastMessage("Favorite status updated.");
        } catch (err) {
            console.error("Error toggling favorite:", err);
            setToastType("error");
            setToastMessage("Failed to update favorite.");
        }
    };

    const handleDelete = async (cardId: string) => {
        if (!token || !isAdmin) return;
        if (!confirm("Are you sure you want to delete this card?")) return;

        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete card");

            setCards((prev) => prev.filter((card) => card._id !== cardId));
            setToastType("success");
            setToastMessage("Card deleted successfully.");
        } catch (err) {
            console.error("Error deleting card:", err);
            setToastType("error");
            setToastMessage("Failed to delete card.");
        }
    };

    const handleEdit = (cardId: string) => {
        navigate(`/cards/${cardId}/edit`);
    };

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
                        .slice(0, isLoggedIn ? 120 : 12)
                        .map((card) => (
                            <Card
                                key={card._id}
                                _id={card._id}
                                title={card.title}
                                subtitle={card.subtitle}
                                phone={card.phone}
                                address={card.address}
                                cardNumber={card.bizNumber}
                                imageUrl={card.image.url}
                                isFavorite={userId ? card.likes.includes(userId) : false}
                                isBusiness={isBiz}
                                isAdmin={isAdmin}
                                onFavoriteToggle={() => toggleFavorite(card._id)}
                                onDelete={() => handleDelete(card._id)}
                                onEdit={() => handleEdit(card._id)}
                            />
                        ))}
                </div>
            )}
        </MainLayout>
    );
};