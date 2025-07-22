import { useNavigate } from "react-router";
import { CardForm } from "../components/Forms/CardForm";
import { getToken } from "../utils/api";
import { useAuth } from "../Context/AuthContext";
import { MainLayout } from "../layouts/MainLayout";
import { DynamicPageHeader } from "../components/DynamicPageHeader";
import { useEffect } from "react";


export const CreateCardPage = () => {
    const navigate = useNavigate();
    const { role, isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn || (role !== "business" && role !== "admin")) {
            navigate("/");
        }
    }, [role, isLoggedIn]);

    const handleCreate = async (data: any) => {
        try {
            const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to create card");

            const result = await res.json();
            console.log("Card created:", result);
            navigate("/Cards");
        } catch (err) {
            alert("Error creating card");
        }
    };

    return (
        <MainLayout>
            <DynamicPageHeader header="Create New Card" />
            <CardForm onSubmit={handleCreate} />
        </MainLayout>
    );
};