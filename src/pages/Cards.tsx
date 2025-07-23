import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useCards } from "../Context/CardsContext";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Cards/Card";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { Toast } from "../components/Ui/Toast";
import "./Cards.css";

export const Cards = () => {
    const navigate = useNavigate();
    const { isBiz, isAdmin, isLoggedIn, userId } = useAuth();

    const {
        cards,
        loading,
        toastMessage,
        toastType,
        setToastMessage,
        toggleFavorite,
        handleDelete,
        errorMessage,
        searchQuery
    } = useCards();

    const handleEdit = (cardId: string) => {
        navigate(`/cards/${cardId}/edit`);
    };

    const filteredCards = cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );


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
            ) : filteredCards.length === 0 ? (
                <p>No matching cards found.</p>
            ) : (
                <div className="cards-container">
                    {filteredCards
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
                                isLoggedIn={isLoggedIn}
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