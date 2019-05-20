import React from 'react';
import * as firebase from "firebase";
import {connect} from "react-redux";
import "../styles/header.css"
import mapStateToProps from "../tests/testStateToProps";
import {logOutAdmin} from "../tests/testLogOutFetch";
import {withRouter} from "react-router-dom";

class Header extends React.Component {

    constructor(props){
        super(props);
        this.logOutFunction = this.logOutFunction.bind(this)
    }

    async logOutFunction(event){
        event.preventDefault();
        await this.props.logOutAdmin();
        this.props.history.push('/login');
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg " color-on-scroll="500">
                <div className=" container-fluid  ">
                    <a className="navbar-brand" href="#pablo"> Dashboard </a>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                    <span className="no-icon logoutbtn" onClick={this.logOutFunction}>Log out</span>
                                </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


export default withRouter(connect(mapStateToProps,{logOutAdmin})(Header));