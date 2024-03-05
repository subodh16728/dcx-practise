import React, { useState } from 'react'
import Cookie from "js-cookie"

import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()
    const token = Cookie.get("token")

    const handleLogout = () => {
        Cookie.remove("token")
        navigate("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/dashboard">Dashboard</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            {
                                token ? <li className="nav-item">
                                    <NavLink className="nav-link active" onClick={handleLogout} aria-current="page" to="/login">Logout</NavLink>
                                </li> : <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;