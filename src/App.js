import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch} from "react-router-dom"
import {IndexRoute, Router , browserHistory} from "react-router"
import Route from "react-router-dom/Route"
import Acceuil from "./pages/Acceuil";
import Produits from "./components/Produits";
import Commandes from "./components/Commandes";
import Clients from "./components/Clients"
import AjouteProduit from "./pages/AjouteProduit";
import ProduitDetail from "./pages/ProduitDetail";
import {Provider} from "react-redux";
import Login from "./pages/Login";
import Store from "./store/Store";
import RedirectPage from "./pages/RedirectPage";
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from "./store/configureStore"
import Header from "./components/Header";
import AjouteCategorie from "./pages/AjouteCategorie";

class App extends Component {

    render() {
        return (
/*<div>
            <Header/>
</div>*/
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                   <BrowserRouter>
                        <RedirectPage>
                            <Switch>
                                <Route path={"/login"} component={Login}/>
                                <Acceuil>
                                    <Route path={"/clients"} component={Clients}/>
                                    <Route path={"/commandes"} component={Commandes}/>
                                    <Route exact path={"/produits"} component={Produits}/>
                                    <Route path={"/ajouterProduit"} component={AjouteProduit}/>
                                    <Route path={"/ajouterCategorie"} component={AjouteCategorie}/>
                                    <Route path={"/detailProduit/:produitId"} component={ProduitDetail}/>
                                </Acceuil>
                            </Switch>
                        </RedirectPage>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );

    }
}

export default App;
