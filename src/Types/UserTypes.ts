export type UserRole = "guest" | "user" | "business" | "admin";

export type AuthContextProps = {
    token: string | null;
    role: UserRole;
    userId: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    isBiz: boolean;
}

export type INavItems = {
    path: string;
    name: string;
}