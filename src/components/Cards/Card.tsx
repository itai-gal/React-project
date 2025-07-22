import { Link } from "react-router";
import "./Card.css";


type AddressType = {
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    zip?: number;
    _id?: string;
};

type Props = {
    _id: string;
    title: string;
    subtitle?: string;
    phone: string;
    address: AddressType;
    cardNumber: number;
    imageUrl: string;
    isFavorite: boolean;
    isBusiness: boolean;
    isAdmin: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onFavoriteToggle?: () => void;
};

// פונקציית עזר להצגת הכתובת 
const formatAddress = (addr: AddressType): string => {
    return [
        addr.street,
        addr.houseNumber,
        addr.city,
        addr.state,
        addr.zip,
        addr.country
    ]
        .filter(Boolean)
        .join(", ");
};

export const Card = ({
    _id,
    title,
    subtitle,
    phone,
    address,
    cardNumber,
    imageUrl,
    isFavorite,
    isBusiness,
    isAdmin,
    onDelete,
    onEdit,
    onFavoriteToggle,
}: Props) => {
    const handleActionClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        action?: () => void
    ) => {
        e.preventDefault();
        e.stopPropagation();
        action?.();
    };

    return (
        <div className="card">
            <Link to={`/cards/${_id}`} className="card-link">
                <img src={imageUrl} alt={title} className="card-img" />
                <div className="card-content">
                    <h3>{title}</h3>
                    {subtitle && <p>{subtitle}</p>}
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Address:</strong> {formatAddress(address)}</p>
                    <p><strong>Card Number:</strong> {cardNumber}</p>
                </div>
            </Link>

            <div className="card-actions">
                {(isBusiness || isAdmin) && (
                    <button
                        onClick={(e) => handleActionClick(e, onFavoriteToggle)}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <i className={`fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`} />
                    </button>
                )}
                {isAdmin && (
                    <>
                        <button
                            onClick={(e) => handleActionClick(e, onEdit)}
                            title="Edit card"
                        >
                            <i className="fa fa-pencil" />
                        </button>
                        <button
                            onClick={(e) => handleActionClick(e, onDelete)}
                            title="Delete card"
                        >
                            <i className="fa fa-trash" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};