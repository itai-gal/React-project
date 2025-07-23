import { useMemo } from "react";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Cards/Card";
import { useAuth } from "../Context/AuthContext";
import { useCards } from "../Context/CardsContext";
import { Toast } from "../components/Ui/Toast";

export const Favorites = () => {
    const { isBiz, isAdmin, isLoggedIn, userId, token } = useAuth();
    const {
        cards,
        loading,
        toastMessage,
        toastType,
        setToastMessage,
        setToastType,
        setCards
    } = useCards();

    const favoriteCards = useMemo(() => {
        return cards.filter((card) => userId && card.likes.includes(userId));
    }, [cards, userId]);

    const toggleFavorite = async (cardId: string) => {
        if (!token) return;

        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-auth-token": token as any,
                },
            });

            if (!res.ok) throw new Error("Toggle favorite failed");

            setCards((prev) =>
                prev.map((card) =>
                    card._id === cardId
                        ? {
                            ...card,
                            likes: card.likes.includes(userId!)
                                ? card.likes.filter((id) => id !== userId)
                                : [...card.likes, userId!],
                        }
                        : card
                )
            );

            setToastType("success");
            setToastMessage("Removed from favorites.");
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
            ) : favoriteCards.length === 0 ? (
                <p>No favorite cards yet.</p>
            ) : (
                <div className="cards-container">
                    {favoriteCards.map((card) => (
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
