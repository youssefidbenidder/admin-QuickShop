import React from "react"
import {storage} from "../firebase/Firebase";
import uuid from 'uuid';
import * as firebase from "firebase";

export default class AjouteCategorie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom : '',
            image: '',
            imageUrl: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.ajouterCategorie= this.ajouterCategorie.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChangeImage(event) {
        console.log(event.target.files[0]);
        this.setState({image: event.target.files[0]});
    }

    ajouterCategorie(event) {

        event.preventDefault();
        let uuidCategorie = uuid.v4();
        const {image} = this.state;
        const task = storage.ref().child(`images/${image.name}`).put(image);
        task.on('state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        this.setState({imageUrl: url});
                        firebase.database().ref('categories/' + uuidCategorie).set({
                                nom: this.state.nom,
                                imageUrl: this.state.imageUrl
                            }
                        )
                    }
                )
            }
        );
    }

    render() {
        return (
            <div>
                <h3 className={"mb-3"}>Ajouter Categorie</h3>
                <fieldset>
                    <form style={{border: "1px solid grey"}} className={"p-3"}>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputDesignation">Nom de Categorie</label>
                                <input className="form-control" name="nom" id="inputDesignation"
                                       placeholder="nom"
                                       onChange={this.onChange} value={this.state.nom}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageControlle">Ajouter Image</label>
                            <input type="file" className="form-control-file"
                                   onChange={this.onChangeImage} />
                        </div>
                        <button className="btn btn-success" onClick={this.ajouterCategorie}>Valider</button>
                        <button type="submit" className="btn btn-danger">Annuler</button>
                    </form>
                </fieldset>
            </div>
        )
    }
}