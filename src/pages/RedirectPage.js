import React from "react"
import {connect} from "react-redux";
import mapStatetoProps from "../tests/testStateToProps";
import {fetchAdmin} from "../tests/testAdminFetch";
import {withRouter} from "react-router-dom";

class RedirectPage extends React.Component {

    constructor(props){
        super(props);
        this.props.fetchAdmin()
    }

    componentWillMount() {
        this.renderRedirect()
    }

    renderRedirect = () => {
        console.log(this.props.admin);
        if (this.props.admin.isAdmin === false) {
            console.log("is not admin");
            this.props.history.push('/login')
        } else {
            console.log("is admin");
            this.props.history.push('/produits')
        }
    };
    render() {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }

}
export default withRouter(connect(mapStatetoProps , {fetchAdmin})(RedirectPage))
