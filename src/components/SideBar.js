import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class SideBar extends Component {

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3><span style={{color : "black" , fontSize : 30}}>Quick</span>
                        <span style={{color : "red" , fontSize : 30}}> Shop</span>
                    </h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Admin</p>
                    <li className={"active"}>
                        <Link to={"/produits"}>Produits</Link>
                    </li>
                    <li >
                        <Link to={"/clients"}>Clients</Link>
                    </li>
                </ul>
            </nav>

        )
    }
}



