import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import icon from './icon.png';

const Navbar = () => (
    <nav>
        <img src={icon} className="icon" />
        <Link to="/">Dulux Samples</Link>
        <Link to="./quests">Quests</Link>
        <Link to="./skills">Skills</Link>
    </nav>
)

export default Navbar;