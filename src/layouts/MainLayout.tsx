import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./MainLayout.css"

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div><Navbar /></div>
            <div className="mainView">{children}</div>
            <div><Footer /></div>
        </div>
    )
}
