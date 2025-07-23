import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { Toast } from "../Ui/Toast";
import "./LoginForm.css";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setToastType("error");
                setToastMessage(errorText || "Login failed. Check your credentials.");
                return;
            }

            const token = await res.text();
            login(token);
            console.log(token);
            setToastType("success");
            setToastMessage("Login successful!");

            setTimeout(() => navigate("/Cards"), 1000);
        } catch (err) {
            console.error("Login error:", err);
            setToastType("error");
            setToastMessage("Login failed. Please try again later.");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="form-title">Login</h2>

                <div className="input-wrapper">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className={email ? "floating" : ""}>
                        <i className="fa fa-envelope" /> Email <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className={password ? "floating" : ""}>
                        <i className="fa fa-lock" /> Password <span className="required">*</span>
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn submit">
                        <i className="fa fa-sign-in" /> Login
                    </button>
                </div>
            </form>

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}
        </div>
    );
};