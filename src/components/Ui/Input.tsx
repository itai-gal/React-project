import type { InputHTMLAttributes } from "react";

type Props = {
    label: string;
    name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, name, ...rest }: Props) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} {...rest} />
    </div>
);