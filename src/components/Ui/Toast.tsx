import { useEffect } from "react";
import "./Toast.css";

type ToastProps = {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
};

export const Toast = ({ message, type = "success", onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button className="toast-close" onClick={onClose}>
                <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
        </div>
    );
};