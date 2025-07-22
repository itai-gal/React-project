import { NavLink, useLocation, useNavigate } from "react-router";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import type { INavItems, UserRole } from "../Types/UserTypes";
import { useAuth } from "../Context/AuthContext";


const getNavItems = (role: UserRole, isLoggedIn: boolean): INavItems[] => {
    const routes: INavItems[] = [
        { path: "/", name: "Cards" },
        { path: "/About", name: "About" }
    ];

    if (isLoggedIn) {
        if (role === "user" || role === "business" || role === "admin") {
            routes.push({ path: "/Favorites", name: "Favorites" });
        }
        if (role === "business" || role === "admin") {
            routes.push({ path: "/MyCards", name: "My Cards" });
        }
        if (role === "admin") {
            routes.push({ path: "/Admin", name: "Admin CRM" });
        }
    }

    return routes;
};

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const { role, isLoggedIn, logout } = useAuth();

    const navItems = getNavItems(role, isLoggedIn);

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
            <div className="navbar-logo" onClick={() => navigate("/")}>BCard</div>

            <div className="navbar-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
            <SearchBar onSearch={handleSearch} />

            <div className="navbar-actions">
                <div className="dark-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌞" : "🌚"}
                </div>
                {!isLoggedIn && location.pathname !== "/signup" && (
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                )}
                {!isLoggedIn && location.pathname !== "/login" && (
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                )}
                {isLoggedIn && (
                    <>
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="nav-link-out"
                        >
                            Logout
                        </button>
                        <div className="avatar">
                            <img src="/avatar.png" alt="avatar" />
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};