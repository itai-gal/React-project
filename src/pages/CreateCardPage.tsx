import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CardForm } from "../components/Forms/CardForm";
import { getToken } from "../utils/api";
import { useAuth } from "../Context/AuthContext";
import { useCards } from "../Context/CardsContext";
import { MainLayout } from "../layouts/MainLayout";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { Toast } from "../components/Ui/Toast";
import type { CardData } from "../Types/CardTypes";

export const CreateCardPage = () => {
    const navigate = useNavigate();
    const { role, isLoggedIn } = useAuth();

    const {
        toastMessage,
        toastType,
        setToastMessage,
        setToastType,
        refetchCards
    } = useCards();

    useEffect(() => {
        if (!isLoggedIn || (role !== "business" && role !== "admin")) {
            navigate("/");
        }
    }, [role, isLoggedIn, navigate]);

    const handleCreate = async (data: CardData) => {
        try {
            const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                    "x-auth-token": getToken() as any
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to create card");

            await res.json();

            setToastType("success");
            setToastMessage("Card created successfully!");

            await refetchCards();

            setTimeout(() => navigate("/MyCards"), 1200);
        } catch (err) {
            console.error("Error creating card:", err);
            setToastType("error");
            setToastMessage("Error creating card.");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Create New Card" />
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}
            <CardForm onSubmit={handleCreate} />
        </MainLayout>
    );
};
