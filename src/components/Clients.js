import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import * as firebase from "firebase";
import {ClientService} from "../services/ClientService";

export default class Clients extends Component {

    clientService = new ClientService();
    constructor(props) {
        super(props);
        this.state = {
            users: {},
        };
        //this.loadClients = this.loadClients.bind(this);
    }

    componentWillMount() {
        this.clientService.loadClients(this);
    }

    /*loadClients() {
        firebase.database().ref('/users').on('value', (snapshot) => {
            this.setState({users: snapshot.val()});
        })
    }*/

    createTable = () => {
        let table = [];
        const {users} = this.state;

        // Outer loop to create parent
        const keys = Object.keys(users);
        for (const key of keys) {
            console.log(users);
            if (users[key].isAdmin !== true) {
                let children = [];
                children.push(<td key={users[key].username}>{users[key].username}</td>);
                children.push(<td key={users[key].email}>{users[key].email}</td>);
                children.push(<td key={users[key].sexe}>{users[key].sexe}</td>);
                children.push(<td key={users[key].dateNaissance}>{users[key].dateNaissance}</td>);
                //Create the parent and add the children
                table.push(<tr key={users[key]}>{children}</tr>)
            }
        }
        return table;
    };


    render() {
        return (
            <div>
                <h1>Clients </h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Nom de client</th>
                        <th>Email</th>
                        <th>Sexe</th>
                        <th>Date de naissance</th>
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