import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ListContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <li>
        <a className="page-scroll" href="#contact" onClick={this.open}>作った人</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>作った人について</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>制作者ページはこちら <a href="https://www.facebook.com/yokota.eiji" target="_blank">facebook page</a></p>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
