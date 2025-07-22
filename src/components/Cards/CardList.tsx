import { Card } from "./Card";

type Props = {
    cards: any[];
    isBusiness: boolean;
    isAdmin: boolean;
    onDeleteCard?: (id: string) => void;
    onEditCard?: (id: string) => void;
    onFavoriteToggle?: (id: string) => void;
};

export const CardList = ({ cards, isBusiness, isAdmin, onDeleteCard, onEditCard, onFavoriteToggle }: Props) => {
    return (
        <div className="card-list">
            {cards.map((card) => (
                <Card
                    key={card._id}
                    {...card}
                    isBusiness={isBusiness}
                    isAdmin={isAdmin}
                    onDelete={() => onDeleteCard?.(card._id)}
                    onEdit={() => onEditCard?.(card._id)}
                    onFavoriteToggle={() => onFavoriteToggle?.(card._id)}
                />
            ))}
        </div>
    );
};