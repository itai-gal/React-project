import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { getToken } from "../utils/api";
import { MainLayout } from "../layouts/MainLayout";
import { Toast } from "../components/Ui/Toast";
import "./AdminCRM.css";

type UserType = {
    _id: string;
    name: { first: string; last: string };
    email: string;
    isBusiness: boolean;
    isAdmin: boolean;
};

export const AdminCRM = () => {
    const { role, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    useEffect(() => {
        if (!isLoggedIn || role !== "admin") {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

    const fetchUsers = async () => {
        try {
            const res = await fetch(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "x-auth-token": getToken() as any,
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Error fetching users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleBusiness = async (userId: string) => {
        try {
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "x-auth-token": getToken() as any,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!res.ok) throw new Error("Toggle failed");

            setToastType("success");
            setToastMessage("User status updated.");
            fetchUsers();
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to update user.");
        }
    };

    const handleDelete = async (user: UserType) => {
        if (user.isAdmin) {
            setToastType("error");
            setToastMessage("Cannot delete admin user.");
            return;
        }

        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "x-auth-token": getToken() as any,
                    },
                }
            );
            if (!res.ok) throw new Error("Delete failed");

            setToastType("success");
            setToastMessage("User deleted.");
            fetchUsers();
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to delete user.");
        }
    };

    return (
        <MainLayout>
            <h2>Admin CRM Panel</h2>

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Business</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name.first} {user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.isBusiness ? "Yes" : "No"}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        onClick={() => toggleBusiness(user._id)}
                                        disabled={user.isAdmin}
                                    >
                                        Toggle Business
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        disabled={user.isAdmin}
                                        style={{ marginLeft: "10px", color: "red" }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </MainLayout>
    );
};
