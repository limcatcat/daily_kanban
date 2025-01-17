import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faChartBar, faChartSimple, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {

    const [urls, setUrls] = useState({});
    const {isAuthenticated, logout, username} = useContext(AuthContext);
    const [isSmartphone, setIsSmartphone] = useState(false);


    useEffect(() => {
        fetch('/api/nav-urls/')
            .then(response => response.json())
            .then(data => setUrls(data));
    }, []);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 550px)');
        const handleMediaChange = (e) => setIsSmartphone(e.matches);
    
        // Set initial state and add listener
        setIsSmartphone(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleMediaChange);
    
        return () => {
          mediaQuery.removeEventListener('change', handleMediaChange);
        };
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
                <a className="nav-link board" href={urls.home}>
                    {isSmartphone ? (
                        <FontAwesomeIcon icon={faCalendarCheck} />
                    ): 
                        <span>
                            Board
                        </span>
                    }
                </a>
                <a className="nav-link stats" href={urls.stats}>
                    {isSmartphone ? (
                        <FontAwesomeIcon icon={faChartSimple} />
                    ):
                        <span>
                            Statistics
                        </span>
                    }
                </a>
                
                <a className="nav-link logout" onClick={handleLogout}>
                    {isSmartphone && isAuthenticated ? (
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    ): ''}
                </a>

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