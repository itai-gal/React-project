import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { Toast } from "../Ui/Toast";
import "./RegisterForm.css";

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
                const err = await res.text();
                throw new Error(err);
            }

            const token = await res.text(); // השרת מחזיר טוקן כטקסט 
            login(token);

            setToastType("success");
            setToastMessage("Login successful!");
            setTimeout(() => navigate("/Cards"), 1000);
        } catch (err: any) {
            console.error("Login failed:", err);
            setToastType("error");
            setToastMessage(err.message || "Login failed");
        }
    };

    return (
        <div className="form">
            <form className="form-grid login-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        className={email ? "floating" : ""}
                    />
                    <label>
                        Email <span className="required">*</span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                        className={password ? "floating" : ""}
                    />
                    <label>
                        Password <span className="required">*</span>
                    </label>
                </div>

                <div className="form-actions" style={{ gridColumn: "span 2" }}>
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