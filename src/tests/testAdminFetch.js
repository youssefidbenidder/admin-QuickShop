import * as firebase from "firebase";

export const  fetchAdmin =  () =>   dispatch => {
    firebase.auth().onAuthStateChanged( user => {
        if(user !== null)
        firebase.database().ref('users/' + user.uid).on('value', async (snapshot) => {
            await dispatch(
                {
                    type: "FETCH_ADMIN",
                    payload: snapshot.val(),
                }
            )
        })
    });
};
