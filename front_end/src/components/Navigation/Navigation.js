import React from 'react';
import './Navigation.css';

import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

export default (props) => {
    return (
        <nav className="main-nav">
            <div className="nav-child">
                <div><Link to="/">Strona główna</Link></div>
                <div><Link to="/users">Użytkownicy</Link></div>
                <div><Link to="/artykuly">Artykuły</Link></div>
                <div><Link to="/zawodnicy">Zawodnicy</Link></div>
                <div><Link to="/wystepy">Wystepy</Link></div>
                <div><Link to="/mecze">Mecze</Link></div>
                <div><Link to="/druzyny">Drużyny</Link></div>
                <div><Link to="/">Wyloguj</Link></div>
            </div>
            <div>
            </div>
        </nav>
    )
}