import * as Firebase from "firebase";
import {auth} from "../firebase/Firebase"

export class AdminService {


    authenticate (User , that){

        //event.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(User.email, User.password)
            .then(async () =>
                Firebase.auth().onAuthStateChanged(await function (user) {
                    if (user) {
                        if (user.isAdmin === false) {
                            alert("les informations incorrectes");
                        } else {
                            that.props.fetchAdmin();
                            that.props.history.push("/produits")
                        }
                        // Admin is signed in.
                    } else {
                        // No admin is signed in.
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


}