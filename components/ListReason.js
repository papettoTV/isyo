import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ListReason extends Component {
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
        <a className="page-scroll" href="#reason" onClick={this.open}>どうして作ったか</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>なぜこのサービスをつくったか</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>このサービスは、遺書を遺すことよりも、遺書を書くことを目的としています。</p>
            <p>遺書を書く時、何を意識しますか？</p>
            <p>一緒に過ごしてきた家族・友人に対して、伝えておきたい言葉や感謝の気持ちがあるのではないでしょうか。</p>
            <p>普段中々意識しない、その感謝の気持ちを少しでも意識するようになれば、あなたの人生が充実するはずです。</p>
            <p>"死"を意識したとき、"生"がより充実します。</p>
            <p>あなたの"生"が少しでも充実しますように。</p>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
