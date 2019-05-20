import React from "react";
import {auth} from "../firebase/Firebase"
import * as Firebase from "firebase";
import {connect} from "react-redux";
import mapStatetoProps from "../tests/testStateToProps";
import {fetchAdmin} from "../tests/testAdminFetch";
import {withRouter} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailInput: "",
            passInput: "",
        };
        this.onChange = this.onChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    componentWillMount() {
        this.renderRedirect()
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    renderRedirect = () => {
        console.log(this.props.admin)
        if (this.props.admin.isAdmin === true) {
            console.log("admin");
            console.log(this.props.admin);
            this.props.history.push('/produits')
        } else {
        console.log(this.props.admin)
        }
    };

    authenticate = (event) => {
        let that = this;
        event.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passInput)
            .then(async () =>
                Firebase.auth().onAuthStateChanged(await function (user) {
                    if (user) {
                        if (user.isAdmin === false) {
                            alert("les informations incorrectes");
                        } else {
                            that.props.fetchAdmin();
                            that.props.history.push("/produits")
                        }
                        // User is signed in.
                    } else {
                        // No user is signed in.
                    }
                }))
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
                // ...
            });
    };

    render() {
        return (
            <div className="login-form">
                <form>
                    <h2 className="text-center">Login</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" required="required"
                               name={"emailInput"} value={this.state.emailInput} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required="required"
                               name={"passInput"} value={this.state.passInput} onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={this.authenticate}>Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(mapStatetoProps, {fetchAdmin})(Login))

