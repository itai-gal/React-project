import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextProps, UserRole } from "../Types/UserTypes";

type DecodedToken = {
    _id: string;
    isBusiness?: boolean;
    isAdmin?: boolean;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole>("guest");
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) return;

        try {
            if (savedToken.split(".").length !== 3) throw new Error("Invalid token");

            const decoded = jwtDecode<DecodedToken>(savedToken);
            if (!decoded._id) throw new Error("Token missing user ID");

            setToken(savedToken);
            setUserId(decoded._id);

            if (decoded.isAdmin) {
                setRole("admin");
                localStorage.setItem("role", "admin");
            } else if (decoded.isBusiness) {
                setRole("business");
                localStorage.setItem("role", "business");
            } else {
                setRole("user");
                localStorage.setItem("role", "user");
            }
        } catch (err) {
            console.error("Token parsing failed:", err);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }, []);

    const login = (newToken: string) => {
        try {
            if (newToken.split(".").length !== 3) throw new Error("Invalid token");

            const decoded = jwtDecode<DecodedToken>(newToken);
            if (!decoded._id) throw new Error("Token missing user ID");

            setToken(newToken);
            setUserId(decoded._id);
            localStorage.setItem("token", newToken);

            if (decoded.isAdmin) {
                setRole("admin");
                localStorage.setItem("role", "admin");
            } else if (decoded.isBusiness) {
                setRole("business");
                localStorage.setItem("role", "business");
            } else {
                setRole("user");
                localStorage.setItem("role", "user");
            }
        } catch (err) {
            console.error("Login failed:", err);
            logout();
        }
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setRole("guest");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    const value: AuthContextProps = {
        token,
        userId,
        role,
        login,
        logout,
        isLoggedIn: !!token,
        isAdmin: role === "admin",
        isBiz: role === "business",
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};