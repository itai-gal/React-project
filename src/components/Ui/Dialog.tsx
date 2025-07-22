export const Dialog = ({ message, onConfirm, onCancel }: {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button onClick={onCancel}>ביטול</button>
                    <button onClick={onConfirm}>אישור</button>
                </div>
            </div>
        </div>
    );
};