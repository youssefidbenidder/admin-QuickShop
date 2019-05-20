import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import "../styles/produits.css"
import * as firebase from "firebase";
import {withRouter} from "react-router-dom";

class Produits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produits: {},
            imageUrl: "",
            description: "",
            produitRechercher: "",
        };
        this.loadProduits = this.loadProduits.bind(this);
        this.deleteProduit = this.deleteProduit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.rechercherProduit = this.rechercherProduit.bind(this);
    }

    componentWillMount() {
        this.loadProduits();
    }

    onNavigateAjouteProduit() {
        this.props.history.push("ajouterProduit")
    }

    onNavigateAjouteCategorie() {
        this.props.history.push("ajouterCategorie")
    }

    deleteProduit(reference) {
        firebase.database().ref('produits/' + reference).remove();
    }


    loadProduits() {
        firebase.database().ref('/produits').on('value', (snapshot) => {
            this.setState({produits: snapshot.val()});
        })
    }

    rechercherProduit() {
        var BreakException = {};
        Object.keys(this.state.produits).forEach(key => {
            if (this.state.produits[key].designation === this.state.produitRechercher) {
                this.props.history.push({
                    pathname: `detailProduit/${this.state.produits[key].reference}`,
                    state: this.state.produits[key]
                });
                throw BreakException;
            }
        });
        alert("le produit n'existent pas !");
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createTable = () => {
        let table = [];
        const {produits} = this.state;

        if (produits !== null) {
            // Outer loop to create parent
            const keys = Object.keys(produits);
            for (const key of keys) {
                let children = [];
                children.push(<td key={produits[key].designation}>{produits[key].designation}</td>);
                children.push(<td key={produits[key].marque}>{produits[key].marque}</td>);
                children.push(<td key={produits[key].numModule}>{produits[key].numModule}</td>);
                children.push(<td key={produits[key].prix}>{produits[key].prix} Mad</td>);
                children.push(<td key={produits[key].qteStock}>{produits[key].qteStock}</td>);
                children.push(<td key={produits[key].reference}>
                    <div className={"btn btn-secondary mb-0 mt-0"}
                         onClick={() => this.props.history.push({
                             pathname: `detailProduit/${produits[key].reference}`,
                             state: produits[key]
                         })}>
                        Modifier
                    </div>
                </td>);
                children.push(<td key={produits[key].reference}>
                    <div className={"btn btn-secondary mb-0 mt-0"}
                         onClick={() => this.deleteProduit(produits[key].reference)}>
                        Supprimer
                    </div>
                </td>);
                //Create the parent and add the children
                table.push(<tr key={produits[key].reference}>{children}</tr>)
            }
        }
        return table
    };

    render() {
        return (
            <div>
                <h1>Produits </h1>
                <input type={"text"} onChange={this.onChange} value={this.state.produitRechercher}
                       name={"produitRechercher"}/>
                <button className={"btn btn-primary"} onClick={() => this.rechercherProduit()}>Rechercher Produit
                </button>
                <br/>
                <button className={"btn btn-primary"} onClick={() => this.onNavigateAjouteProduit()}>+ Ajouter Produit
                </button>
                <button className={"btn btn-primary"} onClick={() => this.onNavigateAjouteCategorie()}>+ Ajouter
                    Catégorie
                </button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Designation</th>
                        <th>Marque</th>
                        <th>Num de Module</th>
                        <th>Prix</th>
                        <th>Quantité en stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.createTable()}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default withRouter(Produits);