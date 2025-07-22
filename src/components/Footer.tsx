import { NavLink } from "react-router";
import { useAuth } from "../Context/AuthContext";

export const Footer = () => {
    const { isLoggedIn, role } = useAuth();

    return (
        <footer className="footer">
            <NavLink to="/About" className="footer-link">About</NavLink>

            {isLoggedIn && (
                <>
                    <NavLink to="/Favorites" className="footer-link">Favorites</NavLink>
                    {(role === "business" || role === "admin") && (
                        <NavLink to="/Cards" className="footer-link">My Cards</NavLink>
                    )}
                </>
            )}
        </footer>
    );
};