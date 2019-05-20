import React from "react"
import {Button, Modal} from "react-bootstrap";
import ImageUplaoder from "../components/ImageUplaoder";

export default class TestPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Ajoueter images
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body><ImageUplaoder/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}