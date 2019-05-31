import * as firebase from "firebase";

export class ClientService {

    loadClients(that) {
        firebase.database().ref('/users').on('value', (snapshot) => {
            that.setState({users: snapshot.val()});
        })
    }

}