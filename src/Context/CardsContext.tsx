import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    phone: string;
    address: {
        state?: string;
        country?: string;
        city?: string;
        street?: string;
        houseNumber?: number;
        zip?: number;
        _id?: string;
    };
    bizNumber: number;
    image: { url: string; alt: string };
    likes: string[];
    user_id: string;
};

type CardsContextType = {
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    loading: boolean;
    refetchCards: () => Promise<void>;
    toastMessage: string;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
    toastType: "success" | "error";
    setToastType: React.Dispatch<React.SetStateAction<"success" | "error">>;
    errorMessage: string;
    toggleFavorite: (cardId: string) => Promise<void>;
    handleDelete: (cardId: string) => Promise<void>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const CardsContext = createContext<CardsContextType | null>(null);

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) throw new Error("useCards must be used within CardsProvider");
    return context;
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
    const { token, userId } = useAuth();
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const refetchCards = async () => {
        setLoading(true);
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

    const toggleFavorite = async (cardId: string) => {
        if (!userId) return;
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
                            likes: card.likes.includes(userId)
                                ? card.likes.filter((id) => id !== userId)
                                : [...card.likes, userId],
                        }
                        : card
                )
            );

            const isNowLiked = cards.find((c) => c._id === cardId)?.likes.includes(userId);

            setToastType("success");
            setToastMessage(isNowLiked ? "Removed from favorites." : "Added to favorites.");

        } catch (err) {
            console.error("Error toggling favorite:", err);
            setToastType("error");
            setToastMessage("Failed to toggle favorite.");
        }
    };

    const handleDelete = async (cardId: string) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-auth-token": token as any,
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

    useEffect(() => {
        refetchCards();
    }, [token]);

    return (
        <CardsContext.Provider
            value={{
                cards,
                setCards,
                loading,
                refetchCards,
                toastMessage,
                setToastMessage,
                toastType,
                setToastType,
                errorMessage,
                toggleFavorite,
                handleDelete,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </CardsContext.Provider>
    );
};
