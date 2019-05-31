import React from "react"
import uuid from 'uuid';
import {Produit} from "../model/Produit";
import {ProduitService} from "../services/ProduitService";

export default class AjouteProduit extends React.Component {

    produit ;
    produitService;
    constructor(props) {
        super(props);
        this.state = {
            categories : {},
            designation: '',
            marque: '',
            numModule: '',
            prix: '',
            qteStock: '',
            categorie: '',
            description: '',
            image: '',
            imageUrl: '',
            rating:'',
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.ajouterProduit = this.ajouterProduit.bind(this);
        this.retour = this.retour.bind(this)
        //this.loadCategories = this.loadCategories.bind(this);

    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChangeImage(event) {
        console.log(event.target.files[0]);
        this.setState({image: event.target.files[0]});
    }

    componentWillMount() {
        this.produitService = new ProduitService();
        this.produitService.loadCategories(this);
        //this.setState({categories : this.produitService.loadCategories()})
    }

    /*loadCategories() {
        /!*firebase.database().ref('/categories').on('value', (snapshot) => {
            this.setState({categories: snapshot.val()});
        })*!/

        this.setState({categories: this.produitService.loadCategories()});

    }*/

    createSelect = () => {
        let select = [];
        const {categories} = this.state;

        const keys = Object.keys(categories);
        for (const key of keys) {
            select.push(<option key={categories[key].nom}>{categories[key].nom}</option>);
        }
        return select
    };


    ajouterProduit(event) {

        event.preventDefault();
        this.produit = new Produit(this.state);
        this.produitService.ajouterProduit(this.produit);


        /*
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
                        firebase.database().ref('produits/' + uuidProduit).set({
                                reference: uuidProduit,
                                designation: this.state.designation,
                                marque: this.state.marque,
                                numModule: this.state.numModule,
                                prix: this.state.prix,
                                qteStock: this.state.qteStock,
                                categorie: this.state.categorie,
                                description: this.state.description,
                                imageUrl: this.state.imageUrl
                            }
                        )
                    }
                )
            }
        );*/
    }

    retour(){
        this.props.history.push("/produits");
    }

    render() {
        return (
            <div>
                <h3 className={"mb-3"}>Ajouter Produit</h3>
                <fieldset>
                    <form style={{border: "1px solid grey"}} className={"p-3"}>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputDesignation">Désignation</label>
                                <input className="form-control" name="designation" id="inputDesignation"
                                       placeholder="désignation"
                                       onChange={this.onChange} value={this.state.designation}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputMarque">Marque</label>
                                <input className="form-control" id="inputMarque" placeholder="marque"
                                       onChange={this.onChange} name="marque" value={this.state.marque}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputNumModel">Numero de module</label>
                                <input type="text" className="form-control" id="inputNumModel"
                                       onChange={this.onChange} name="numModule"
                                       placeholder="Numero de module" value={this.state.numModule}/>
                            </div>
                        </div>
                        <div className={"form-row"}>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPrix">Prix</label>
                                <input type="number" className="form-control" id="inputPrix"
                                       onChange={this.onChange} name="prix"
                                       placeholder="0.99 $" step="0.1"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputQte">Qte en stock</label>
                                <input type="number" className="form-control" id="inputQte"
                                       onChange={this.onChange} name="qteStock" placeholder="Quantité"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputCatégorie">Catégorie</label>
                                <select id="inputCatégorie" className="form-control"
                                        onChange={this.onChange} name="categorie" value={this.state.categorie}>
                                    {this.createSelect()}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-10">
                                <label htmlFor="textAreaDescription">Description</label>
                                <textarea className="form-control" id="textAreaDescription" rows="5"
                                          onChange={this.onChange} name="description"
                                          value={this.state.description}/>
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputRating">Rating</label>
                            <input type="number" className="form-control" id="inputRating"
                                   onChange={this.onChange} name="rating" step="0.1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageControlle">Ajouter Image</label>
                            <input type="file" className="form-control-file"
                                   onChange={this.onChangeImage} />
                        </div>
                        <button className="btn btn-success" onClick={this.ajouterProduit}>Valider</button>
                        <button type="submit" className="btn btn-danger" onClick={this.retour}>Annuler</button>
                    </form>
                </fieldset>
            </div>
        )
    }
}