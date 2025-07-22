import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextProps, UserRole } from "../Types/UserTypes";

type DecodedToken = {
    _id: string;
    isBusiness?: boolean;
    isAdmin?: boolean;
    // תאריך יצירת הטוקן
    iat?: number;
    // תוקף הטוקן
    exp?: number;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole>("guest");
    const [userId, setUserId] = useState<string | null>(null);

    // פונקציה לבדוק מבנה JWT
    const isValidJWT = (jwt: string) => jwt.split(".").length === 3;

    // טעינת הטוקן מה- LocalStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) return;

        try {
            if (!isValidJWT(savedToken)) throw new Error("Invalid token format");
            const decoded = jwtDecode<DecodedToken>(savedToken);

            if (!decoded._id) throw new Error("Token missing user ID");
            if (decoded.exp && Date.now() >= decoded.exp * 1000)
                throw new Error("Token expired");

            setToken(savedToken);
            setUserId(decoded._id);

            const detectedRole: UserRole = decoded.isAdmin
                ? "admin"
                : decoded.isBusiness
                    ? "business"
                    : "user";

            setRole(detectedRole);
            localStorage.setItem("role", detectedRole);
        } catch (err) {
            console.error("Failed to initialize token:", err);
            logout(); // במידה והטוקן לא תקין – ניקוי
        }
    }, []);


    const login = (newToken: string) => {
        try {
            if (!isValidJWT(newToken)) throw new Error("Invalid token format");
            const decoded = jwtDecode<DecodedToken>(newToken);

            if (!decoded._id) throw new Error("Token missing user ID");
            if (decoded.exp && Date.now() >= decoded.exp * 1000)
                throw new Error("Token expired");

            localStorage.setItem("token", newToken);
            setToken(newToken);
            setUserId(decoded._id);

            const detectedRole: UserRole = decoded.isAdmin
                ? "admin"
                : decoded.isBusiness
                    ? "business"
                    : "user";

            setRole(detectedRole);
        } catch (err) {
            console.error("Login failed:", err);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserId(null);
        setRole("guest");
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

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};