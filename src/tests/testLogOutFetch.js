import * as firebase from "firebase";

export const  logOutAdmin =  () =>   dispatch => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch(
            {
                type: "LOGOUT_ADMIN",
                payload : {
                    email : "",
                    isAdmin: false
                }
            })
    }).catch(function(error) {
        // An error happened.
    });
};
