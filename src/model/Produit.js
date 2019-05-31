export class Produit {
    designation;
    description;
    reference;
    marque;
    numModule;
    prix;
    qteStock;
    categorie;
    image;
    imageUrl;
    rating;

    constructor(state) {
        this.designation = state.designation;
        this.description = state.description;
        this.reference = state.reference;
        this.marque = state.marque;
        this.categorie = state.categorie;
        this.numModule = state.numModule;
        this.prix = state.prix;
        this.qteStock = state.qteStock;
        this.imageUrl = state.imageUrl;
        this.image = state.image;
        this.rating = state.rating
    }

}