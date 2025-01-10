import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {

    const [urls, setUrls] = useState({});
    const {isAuthenticated, logout, username} = useContext(AuthContext);


    useEffect(() => {
        fetch('/api/nav-urls/')
            .then(response => response.json())
            .then(data => setUrls(data));
    }, []);


    const handleLogout = event => {
        event.preventDefault();
        logout();
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark" data-bs-theme="dark" style={{backgroundColor: "#000000"}}>
        <div className="container-fluid">
  
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className="nav-link home" href={urls.home}>Daily Kanban</a>
            <div className='menu-container'>
                <a className="nav-link board" href={urls.home}>Board</a>
                <a className="nav-link stats" href={urls.stats}>Statistics</a>
            </div>

            {isAuthenticated && 
                (   <div className='auth-container'>
                        <span className='username'>{username}</span>
                        <a className='nav-link login' href='#' onClick={handleLogout}>Sign out</a>
                    </div>
                )
            }

            </div>
          </div>
        </div>
      </nav>

    );

};

export default Navbar;