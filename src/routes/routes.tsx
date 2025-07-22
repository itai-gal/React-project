import { createBrowserRouter } from "react-router";
import { Cards } from "../pages/Cards";
import { About } from "../pages/About";
import { Favorites } from "../pages/Favorites";
import { User } from "../pages/User";
import { BusinessPage } from "../pages/BusinessPage";
import { EditCards } from "../pages/EditCards";
import { AdminCRM } from "../pages/AdminCRM";
import { CreateCardPage } from "../pages/CreateCardPage";
import { CardDetails } from "../pages/CardDetails";
import { RegisterForm } from "../components/Forms/RegisterForm";
import { LoginForm } from "../components/Forms/LoginForm";

export const myrouter = createBrowserRouter([
    { path: "/", Component: Cards },
    { path: "/cards", Component: Cards },
    { path: "/About", Component: About },
    { path: "/Favorites", Component: Favorites },
    { path: "/User", Component: User },
    { path: "/business", Component: BusinessPage },
    { path: "/cards/:id/edit", Component: EditCards },
    { path: "/Admin", Component: AdminCRM },
    { path: "/create-card", Component: CreateCardPage },
    { path: "/cards/:id", Component: CardDetails },
    { path: "/signup", Component: RegisterForm },
    { path: "/login", Component: LoginForm },
]);