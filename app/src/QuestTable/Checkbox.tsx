import React from "react";
import "./Checkbox.css"

interface Props {
    label: string;
    checked: boolean;
    onChange: () => void
}

const Checkbox: React.FC<Props> = ({label, checked, onChange}) => (
    <label><input className="checkbox" type="checkbox" checked={checked} onChange={onChange}/> {label}</label>
)

export default Checkbox;