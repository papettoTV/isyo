import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ListAbout extends Component {
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
        <a className="page-scroll" href="#about" onClick={this.open}>このサービスについて</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>このサービスについて</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>「遺書一筆」は、遺書を書くことができるサービスです。</p>
            <p>書いた遺書は、基本的には、誰にも公開されません。書いた本人だけが見たり編集できます。（将来、課金した人にだけ公開する機能を実装予定です。）</p>
            <p>一度、遺書を書いてみませんか？</p>
            <p>&nbsp;</p>
            <p>※なお、このサービスは個人により運営されております。遺書としての役割を担保するサービスではありませんのでご注意ください。
            また、予告なくサービスが終了する場合もございます。ご了承下さい。</p>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
