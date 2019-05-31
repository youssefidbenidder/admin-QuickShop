import uuid from "uuid";
import {storage} from "../firebase/Firebase";
import * as firebase from "firebase";

export class CategorieService {


    ajouterCategorie(categorie) {

        let uuidCategorie = uuid.v4();
        const {image} = categorie;
        const task = storage.ref().child(`images/${image.name}`).put(image);
        task.on('state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        categorie.imageUrl = url;
                        firebase.database().ref('categories/' + uuidCategorie).set({
                                nom: categorie.nom,
                                imageUrl: categorie.imageUrl
                            }
                        )
                    }
                )
            }
        );
    }


}