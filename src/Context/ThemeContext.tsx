import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // קריאה רק בדפדפן כדי להימנע משגיאות SSR
        const saved = localStorage.getItem("darkMode") === "true";
        setDarkMode(saved);
        document.body.classList.toggle("dark-mode", saved);
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", String(newMode));
        document.body.classList.toggle("dark-mode", newMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used inside a ThemeProvider");
    return context;
};