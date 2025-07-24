import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { useAuth } from "../Context/AuthContext";
import { getToken } from "../utils/api";
import { Toast } from "../components/Ui/Toast";
import "./AdminPage.css";

type User = {
    _id: string;
    name: { first: string; last: string };
    email: string;
    isBusiness: boolean;
    isAdmin: boolean;
};

export const AdminPage = () => {
    const { role, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    useEffect(() => {
        if (!isLoggedIn || role !== "admin") {
            navigate("/");
        } else {
            fetchUsers();
        }
    }, [isLoggedIn, role]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", {
                headers: { Authorization: `Bearer ${getToken()}` },
            });

            if (!res.ok) throw new Error("Failed to load users");

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to fetch users");
        }
    };

    const toggleBusinessStatus = async (userId: string, isBusiness: boolean) => {
        try {
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify({ isBusiness: !isBusiness }),
                }
            );

            if (!res.ok) throw new Error("Failed to update user");

            setUsers((prev) =>
                prev.map((user) =>
                    user._id === userId ? { ...user, isBusiness: !isBusiness } : user
                )
            );

            setToastType("success");
            setToastMessage("User status updated.");
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to update user status.");
        }
    };

    const deleteUser = async (userId: string, isAdmin: boolean) => {
        if (isAdmin) return alert("Cannot delete admin user");

        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Failed to delete user");

            setUsers((prev) => prev.filter((u) => u._id !== userId));
            setToastType("success");
            setToastMessage("User deleted successfully.");
        } catch (err) {
            console.error(err);
            setToastType("error");
            setToastMessage("Failed to delete user.");
        }
    };

    return (
        <MainLayout>
            <h2>Admin CRM</h2>

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage("")}
                />
            )}

            <div className="admin-table">
                <table>
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
                                <td>
                                    <i className={`fa ${user.isBusiness ? "fa-check" : "fa-times"}`} />
                                </td>
                                <td>
                                    <i className={`fa ${user.isAdmin ? "fa-check" : "fa-times"}`} />
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            toggleBusinessStatus(user._id, user.isBusiness)
                                        }
                                        disabled={user.isAdmin}
                                        title="Toggle Business Status"
                                    >
                                        <i className="fa fa-refresh" />
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id, user.isAdmin)}
                                        disabled={user.isAdmin}
                                        className="delete-btn"
                                        title="Delete User"
                                    >
                                        <i className="fa fa-trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
};
