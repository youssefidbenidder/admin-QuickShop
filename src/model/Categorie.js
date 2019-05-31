export class Categorie {

    nom;
    image;
    imageUrl;

    constructor(state) {
        this.nom = state.nom;
        this.image = state.image;
        this.imageUrl = state.imageUrl;
    }


}