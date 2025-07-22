import { Link } from "react-router";
import "./Card.css";

type Props = {
    _id: string;
    title: string;
    subtitle?: string;
    phone: string;
    address: string;
    cardNumber: number;
    imageUrl: string;
    isFavorite: boolean;
    isBusiness: boolean;
    isAdmin: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onFavoriteToggle?: () => void;
};

export const Card = ({ _id, title, subtitle, phone, address, cardNumber, imageUrl, isFavorite, isBusiness, isAdmin, onDelete, onEdit, onFavoriteToggle }: Props) => {
    return (
        <div className="card">
            <Link to={`/cards/${_id}`} className="card-link">
                <img src={imageUrl} alt={title} />
                <div className="card-content">
                    <h3>{title}</h3>
                    {subtitle && <p>{subtitle}</p>}
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Card Number:</strong> {cardNumber}</p>
                </div>
            </Link>
            <div className="card-actions">
                {isBusiness && (
                    <button onClick={onFavoriteToggle}>
                        <i className={`fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`}></i>
                    </button>
                )}
                {isAdmin && (
                    <>
                        <button onClick={onEdit}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button onClick={onDelete}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};