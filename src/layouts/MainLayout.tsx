import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div><Navbar /></div>
            <div>{children}</div>
            <div>Footer</div>
        </div>
    )
}
