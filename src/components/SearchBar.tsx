import { useState } from "react";
import "./SearchBar.css";

type Props = {
    onSearch?: (value: string) => void;
};

export const SearchBar = ({ onSearch }: Props) => {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    };
    return (
        <div className="navbar-search">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
            />
            <button onClick={(e) => onSearch?.(search)}>🔍</button>
        </div>
    );
};