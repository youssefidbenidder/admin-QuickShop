import uuid from "uuid";
import {storage} from "../firebase/Firebase";
import * as firebase from "firebase";

function IDGenerator() {

    this.length = 8;
    this.timestamp = +new Date;

    var _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };

    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];
        }
        return id;
    }
}

export class ProduitService {

    ajouterProduit(produit) {

        let generator = new IDGenerator();
        let uuidProduit = generator.generate();
        let uuidReference = uuid.v4();
        console.log(uuidProduit);
        const {image} = produit;
        const task = storage.ref().child(`images/${image.name}`).put(image);
        task.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        produit.imageUrl = url;
                        firebase.database().ref('produits/' + uuidReference).set({
                                reference : uuidReference,
                                id: uuidProduit,
                                designation: produit.designation,
                                marque: produit.marque,
                                numModule: produit.numModule,
                                prix: produit.prix,
                                qteStock: produit.qteStock,
                                categorie: produit.categorie,
                                description: produit.description,
                                imageUrl: produit.imageUrl,
                                rating: produit.rating
                            }
                        )
                    }
                );
                alert("le produit a été bien ajouté !");
            }
        );
    }

    loadCategories(that) {
        firebase.database().ref('/categories').on('value', (snapshot) => {
            that.setState({categories: snapshot.val()});
        })
    }

    loadProduits(that) {
        firebase.database().ref('/produits').on('value', (snapshot) => {
            that.setState({produits: snapshot.val()});
        })
    }

    deleteProduit(reference) {
        firebase.database().ref('produits/' + reference).remove();
    }

    updateProduit(produit) {
        const {image} = produit;
        if (image !== undefined) {
            const task = storage.ref().child(`images/${image.name}`).put(image);
            task.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        produit.imageUrl = url;
                        firebase.database().ref('produits/' + this.state.reference).update({
                            imageUrl: produit.imageUrl,
                        })
                    })
                });
        }
        firebase.database().ref('produits/' + produit.reference).update({
            designation: produit.designation,
            marque: produit.marque,
            numModule: produit.numModule,
            prix: produit.prix,
            qteStock: produit.qteStock,
            categorie: produit.categorie,
            description: produit.description,
        });
        alert("le produit a été bien modifié");
    }
}