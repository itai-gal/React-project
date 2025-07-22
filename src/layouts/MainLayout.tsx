import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div><Navbar /></div>
            <div>{children}</div>
            <div><Footer /></div>
        </div>
    )
}
