import React, {Component} from 'react';
import '../styles/sidebar.css'
import {Link} from "react-router-dom";

export default class SideBar extends Component {

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Dashboard </h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Admin</p>
                    <li className="active">
                        <Link to={"/clients"}>Clients</Link>
                    </li>
                    <li>
                        <Link to={"/commandes"}>Commandes</Link>
                    </li>
                    <li>
                        <Link to={"/produits"}>Produits</Link>
                    </li>
                </ul>
            </nav>

        )
    }
}



