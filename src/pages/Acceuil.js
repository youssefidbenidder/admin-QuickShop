import React from "react"
import SideBar from "../components/SideBar";
import "../styles/acceuil.css"
import mapStateToProps from "../tests/testStateToProps";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Header from "../components/Header";

class Acceuil extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <nav id="sidebar">
                        <SideBar/>
                    </nav>
                    <div>
                        <div className={"col"} style={{position: "fixed" ,width : "80%" , backgroundColor : "#43b581" , zIndex : "100"}}>
                            <Header/>
                        </div>
                        <div id="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Acceuil));