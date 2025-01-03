import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {

    const {isAuthenticated, logout} = useContext(AuthContext);


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
                <a className="nav-link" href="{% url 'frontend:home' %}">Daily Kanban</a>
                <a className="nav-link" href="{% url 'frontend:home' %}">Board</a>
                <a className="nav-link" href="{% url 'frontend:statistics' %}">Statistics</a>

            {isAuthenticated && 
                (
                    <a className='nav-link login' href='#' onClick={handleLogout}>Logout</a>
                )
            }

            </div>
          </div>
        </div>
      </nav>

    );

};

export default Navbar;