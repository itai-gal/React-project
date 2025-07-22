import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import "./RegisterForm.css"
import { Toast } from "../Ui/Toast";


export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const { login } = useAuth();
    const navigate = useNavigate();

    const regex = {
        name: /^.{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^05\d([-]?)\d{7}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
    };

    const validateField = (name: string, value: string | boolean): string => {
        if (typeof value !== "string") return "";
        switch (name) {
            case "firstName":
                return regex.name.test(value) ? "" : `"first" length must be at least 2 characters long`;
            case "phone":
                return regex.phone.test(value) ? "" : `user "phone" must be a valid phone number`;
            case "email":
                return regex.email.test(value) ? "" : `user "mail" must be a valid mail`;
            case "password":
                return regex.password.test(value)
                    ? ""
                    : `user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters (!@#$%^&*)`;
            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: updatedValue }));

        if (["firstName", "phone", "email", "password"].includes(name)) {
            const valueToValidate = typeof updatedValue === "string" ? updatedValue : "";
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, valueToValidate),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        for (const key of Object.keys(formData)) {
            const error = validateField(key, (formData as any)[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const body = {
            name: {
                first: formData.firstName,
                middle: formData.middleName,
                last: formData.lastName,
            },
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            image: {
                url: formData.imageUrl,
                alt: formData.imageAlt,
            },
            address: {
                state: formData.state,
                country: formData.country,
                city: formData.city,
                street: formData.street,
                houseNumber: +formData.houseNumber,
                zip: +formData.zip || 0,
            },
            isBusiness: formData.isBusiness,
        };

        try {
            const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Registration failed");

            const data = await res.json();
            login(data.token);
            setToastType("success");
            setToastMessage("Registration successful!");
            setTimeout(() => navigate("/cards"), 2 * 1000);
        } catch (err) {
            setToastType("error");
            setToastMessage("Registration failed");
        }
    };

    const renderField = (
        name: string,
        label: string,
        required: boolean = false,
        type: string = "text"
    ) => (
        <div className="input-wrapper">
            <input
                name={name}
                type={type}
                value={(formData as any)[name]}
                onChange={handleChange}
                required={required}
                className={errors[name] ? "invalid" : ""}
            />
            <label className={formData[name as keyof typeof formData] ? "floating" : ""}>
                {label} {required && <span className="required">*</span>}
            </label>
            {errors[name] && <small className="error">{errors[name]}</small>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Register</h2>
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            <div className="form-grid">
                {renderField("firstName", "First name", true)}
                {renderField("middleName", "Middle name")}
                {renderField("lastName", "Last name", true)}
                {renderField("phone", "Phone", true)}
                {renderField("email", "Email", true, "email")}
                {renderField("password", "Password", true, "password")}
                {renderField("imageUrl", "Image url")}
                {renderField("imageAlt", "Image alt")}
                {renderField("state", "State")}
                {renderField("country", "Country", true)}
                {renderField("city", "City", true)}
                {renderField("street", "Street", true)}
                {renderField("houseNumber", "House number", true)}
                {renderField("zip", "Zip")}

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
                    />
                    Signup as business
                </label>
            </div>

            <div className="form-actions">
                <button type="button" className="btn cancel">Cancel</button>
                <button type="submit" className="btn submit">Submit</button>
            </div>
        </form>
    );
};