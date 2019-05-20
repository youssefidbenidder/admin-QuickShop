import React, { Component }  from 'react';
import {Table} from "react-bootstrap";

export default class Commandes extends Component{
    render(){
        return(
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Référence</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Montant</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Youssef</td>
                    <td>#1</td>
                    <td>14/14/1568</td>
                    <td>En attende</td>
                    <td>200dh</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mouad</td>
                    <td>#13</td>
                    <td>14/14/1898</td>
                    <td>En traitment</td>
                    <td>150dh</td>
                </tr>
                </tbody>
            </Table>
        )
    }

}