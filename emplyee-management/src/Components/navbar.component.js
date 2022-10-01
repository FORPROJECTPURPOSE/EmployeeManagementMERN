import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavbarComponent extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary p-3">
                <a className="navbar-brand text-light" >ABC (pvt) Ltd.</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link text-light">All Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create_employees" className="nav-link text-light">Employee Registration</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarComponent;