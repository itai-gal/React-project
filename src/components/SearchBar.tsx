import { useState } from "react";

type Props = {
    onSearch?: (value: string) => void;
};

export const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="navbar-search">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
            />
            <button onClick={() => onSearch(query)}>
                <i className="fa fa-search" />
            </button>
        </div>
    );
};