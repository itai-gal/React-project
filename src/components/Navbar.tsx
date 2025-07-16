import { NavLink, useLocation } from "react-router";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";

const navItems = [
    { path: "/", label: "Home" },
    { path: "/About", label: "About" },
    { path: "/Favorites", label: "Favorites" },
    { path: "/Admin", label: "Admin CRM" },
    { path: "/business", label: "Business Page" },
    { path: "/CardsEdit", label: "Edit Cards" },
    { path: "/Cards", label: "My Cards" },
    { path: "/User", label: "User" },
];

export const Navbar = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(navItems[0]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const match = navItems.find((item) => item.path === location.pathname);
        if (match) {
            setCurrentPath(match);
        }
    }, [location.pathname]);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const handleSearch = (value: string) => {
        console.log("Search:", value);
    };

    return (
        <nav className={`navbar ${darkMode ? "dark" : ""}`}>
            <div className="navbar-logo">BCard</div>

            <div className="navbar-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <SearchBar onSearch={handleSearch} />

            <div className="navbar-actions">
                <div className="dark-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌞" : "🌚"}
                </div>
                <div className="avatar">
                    <img src="/avatar.png" alt="avatar" />
                </div>
            </div>
        </nav>
    );
};