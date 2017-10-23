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
            <Modal.Title>なぜこのサービスを作ったのか</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>このサービスは、遺書を遺すことよりも、遺書を"書くこと"を目的としています。</p>
            <p>遺書を書く時、何を意識しますか？誰を思い浮かべますか？伝えたい／遺しておきたいことはなんですか？</p>
            <p>それは、恋人でしょうか。息子でしょうか。母親でしょうか。</p>
            <p>それは、感謝の気持ちでしょうか？伝えたい言葉でしょうか？</p>
            <p>そんな普段中々意識しない、「何か」を、普段から少しでも意識することで、何気ない日々がいつもより少しだけ充実するんじゃないか。
            <br />そう思って作りました。</p>
            <p>"死"を意識したとき、"生"がより充実します。<br />
            あなたの"生"が少しでも充実しますように。</p>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
