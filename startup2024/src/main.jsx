import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import ApiCalendar from 'react-google-calendar-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { Login } from './login/login'
import { About } from './about/about'
import { Account } from './account/account'
import { Home } from './home/home'
import { Notebook } from './notebook/notebook'

// Configure Google Calendar
const config = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
};

const apiCalendar = new ApiCalendar(config);

// Error handle the calendar api key
if(!process.env.REACT_APP_GOOGLE_API_KEY) {
    console.error("No Google API key found in .env file.");
}

export default function Main() {
    return (
        <BrowserRouter>
            <header className="header-nav">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="logo">GOAL SECRETARY</div>
                    <menu className='navbar-nav'>
                        <li className="navbar-item">
                            <NavLink className='nav-link' to="home">Home</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className='nav-link' to="notebook">Notebook</NavLink>
                        </li>
                        <li className="navbar-item">
                        <NavLink className='nav-link' to="about">About</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className='nav-link' to="account">My Account</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className='nav-link' to="">Login</NavLink>
                        </li>
                    </menu>
                </nav>
                <div className="status-bar">
                    <div className="status-item" id="tasks">Current Tasks: 0</div>
                    <div className="status-item" id="score">Score: 0</div>
                </div>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/notebook' element={<Notebook />} />
                <Route path='/account' element={<Account />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function NotFound() {
    return (<div>Page not found</div>);
}