import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";

export const myrouter = createBrowserRouter([
    { path: "/", Component: Home },
]);

