import { useNavigate } from "react-router";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Cards/Card";
import { useAuth } from "../Context/AuthContext";
import { useCards } from "../Context/CardsContext";
import { Toast } from "../components/Ui/Toast";
import "./MyCards.css";

export const MyCards = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isBiz, isAdmin, userId } = useAuth();

    const {
        cards,
        loading,
        toastMessage,
        toastType,
        setToastMessage,
        toggleFavorite,
        handleDelete,
    } = useCards();

    const myCards = cards.filter((card) => card.user_id === userId);

    return (
        <MainLayout>
            <DynamicPageHeader header="My Business Cards" />

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            {loading ? (
                <p>Loading...</p>
            ) : myCards.length === 0 ? (
                <p>No cards found.</p>
            ) : (
                <div className="cards-container">
                    {myCards.map((card) => (
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
                            onEdit={() => navigate(`/cards/${card._id}/edit`)}
                            onDelete={() => handleDelete(card._id)}
                        />
                    ))}
                </div>
            )}

            <button
                className="floating-add-button"
                onClick={() => navigate("/create-card")}
            >
                <i className="fa fa-plus" />
            </button>
        </MainLayout>
    );
};
