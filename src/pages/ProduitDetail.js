import React from "react"
import "../styles/produitDetail.css"
import * as firebase from "firebase";
import {storage} from "../firebase/Firebase";
import {withRouter} from "react-router-dom";
import {Produit} from "../model/Produit";
import {ProduitService} from "../services/ProduitService";

class ProduitDetail extends React.Component {

    produit;
    produitService = new ProduitService();
    constructor(props) {
        super(props);
        this.state = this.props.location.state;
        this.onChange = this.onChange.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.updateProduit = this.updateProduit.bind(this);
        this.retour = this.retour.bind(this);
        //this.deleteProduit = this.deleteProduit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChangeImage(event) {
        console.log(event.target.files[0]);
        this.setState({
            image: event.target.files[0],
            imageUrl: URL.createObjectURL(event.target.files[0])
        });
    }

    updateProduit(event) {
        event.preventDefault();
        const {image} = this.state;
        this.produit = new Produit(this.state);
        this.produitService.updateProduit(this.produit);
        /*const {image} = this.state;
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
                        this.setState({imageUrl: url});
                        firebase.database().ref('produits/' + this.state.reference).update({
                            imageUrl: this.state.imageUrl,
                        })
                    })
                });
        }
        firebase.database().ref('produits/' + this.state.reference).update({
            designation: this.state.designation,
            marque: this.state.marque,
            numModule: this.state.numModule,
            prix: this.state.prix,
            qteStock: this.state.qteStock,
            categorie: this.state.categorie,
            description: this.state.description,
        });
        alert("le produit a été bien modifié");*/
    }

    retour(){
        this.props.history.push("/produits");
    }


    render() {
        return (
            <div className="container">
                <h1>Edit Produit</h1>
                <hr/>
                <div className="row">
                    <div className="col-md-5">
                        <div className="text-center">
                            <img src={this.state.imageUrl} className="avatar img-circle" alt="avatar"/>
                            <h6>Changer la photo</h6>
                            <input name={"imageUrl"} onChange={this.onChangeImage} type="file"
                                   className="form-control"/>
                        </div>

                    </div>


                    <div className="col-md-7 personal-info">
                        <form className={"p-3"}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputDesignation">Désignation</label>
                                    <input onChange={this.onChange} value={this.state.designation}
                                           name={"designation"}
                                           type="text" className="form-control"
                                           id="inputDesignation" placeholder="désignation"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMarque">Marque</label>
                                    <input onChange={this.onChange} value={this.state.marque} name={"marque"}
                                           type="text" className="form-control"
                                           id="inputMarque" placeholder="marque"/>
                                </div>

                            </div>
                            <div className={"row"}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputNumModel">Numero de module</label>
                                    <input onChange={this.onChange} value={this.state.numModule} name={"numModule"}
                                           type="text" className="form-control"
                                           id="inputNumModel"
                                           placeholder="Numero de module"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCatégorie">Catégorie</label>
                                    <select id="inputCatégorie" className="form-control"
                                            onChange={this.onChange} name="categorie" value={this.state.categorie}>
                                        <option>Electronique</option>
                                        <option>Montres</option>
                                        <option>Téléphones</option>
                                        <option>Ordinateur</option>
                                    </select>
                                </div>
                            </div>
                            <div className={"form-row"}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPrix">Prix</label>
                                    <input onChange={this.onChange} type="number" className="form-control"
                                           id="inputPrix"
                                           name={"prix"} value={this.state.prix} placeholder="0.99 $" step="0.1"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputQte">Qte en stock</label>
                                    <input type="number" className="form-control" id="inputQte" name={"qteStock"}
                                           onChange={this.onChange} value={this.state.qteStock}
                                           placeholder="Quantité"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="textAreaDescription">Description</label>
                                    <textarea onChange={this.onChange} value={this.state.description}
                                              name={"description"} className="form-control"
                                              id="textAreaDescription" rows="5"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success" onClick={this.updateProduit}>Valider</button>
                            <button type="submit" className="btn btn-danger" onClick={this.retour}>Annuler</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ProduitDetail);