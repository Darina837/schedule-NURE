import React from 'react';
import logo from '../../media/logo.jpg';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className='header-content' data-aos='fade-down' data-aos-easing="linear" data-aos-duration="1000">
                <Link to='/'><img src={logo} alt='' /></Link>
                <h2>Розклад ХНУРЕ</h2>
            </div>
        </header>
    )
}